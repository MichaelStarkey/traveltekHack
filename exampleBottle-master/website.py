from bottle import route, run, static_file, template, request, redirect
import os
import sqlite3

#simple database query, returns all contact names in the format:
#   {people: [(personA, idA), (personB, idB),...], orgs: [(orgA, idA), (orgB, idB),...]}
def getAll():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT name, id FROM contact WHERE type = 'person' ORDER BY name COLLATE NOCASE")
    people = c.fetchall()
    c.execute("SELECT name, id FROM contact WHERE type = 'organisation' ORDER BY name COLLATE NOCASE")
    orgs = c.fetchall()
    c.close()
    return {'people': people, 'orgs': orgs}


#this database query collates all of the details for a contact, differs slightly
#   depending on the type of contact. Returns in the format:
#   (name, email, phone, addrOne, addrTwo, addrThree, type, [(org, orgID),...]) or
#   (name, email, phone, addrOne, addrTwo, addrThree, type, [(person, personID),...])
#   NOTE: if the contact has no linked people / organisation the final tuple will be blank
def getDetails(id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT name, email, phone, addrOne, addrTwo, addrThree, type FROM contact WHERE id = (?)", (id,))
    details = c.fetchone()
    if details[6] == 'person':
        c.execute("SELECT organisation FROM partOf WHERE person = (?)", (id,))
    else:
        c.execute("SELECT person FROM partOf WHERE organisation = (?)", (id,))
    val = c.fetchall()
    print(val)
    if val == ():
        details += ([],)
    else:
        details += (getNames(val),)
    conn.commit()
    c.close()

    return details

#queries database for specific contact id and returns the name
def getName(id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT name FROM contact WHERE id = (?)", (id,))
    name = c.fetchone()
    conn.commit()
    c.close()
    return name

#queries database for several contact ids
#   output: [[name, id], [name, id], ...]
def getNames(ids):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    names = []
    for i in ids:
        c.execute("SELECT name FROM contact WHERE id = (?)", i)
        names.append((c.fetchone()[0],i[0]))
    conn.commit()
    c.close()
    return names

#parses the add new form query, which is also used for the editing contacts
def getQuery():
    name = request.query.name
    addrOne = request.query.addrOne
    addrTwo = request.query.addrTwo
    addrThree = request.query.addrThree
    email = request.query.email
    phone = request.query.number
    return (name,addrOne,addrTwo,addrThree,email,phone)

#static file-path, allows for adding more scripts / styles later
@route('/static/<type>/<filename>')
def server_static(type, filename):
    return static_file(filename, root='static/'+type)

#basic home-page, utilies a 'base' template for further expansion.
#   content-dictionary in the form:
#   {people: [a,b,...], orgs: [x,y,...], title: 'Address Book', text: 'Browse existing contacts or make a new one.'}
@route('/')
def main():
    contdict = getAll()
    contdict['title'] = 'Address Book'
    contdict['text'] = 'Browse existing contacts or make a new one.'

    return template('base.tpl', contdict=contdict)

#contact page view, uses a skeleton contact for both organisations and people
#   content-dictionary in the form:
#   {people: [a,b,...], orgs: [x,y,...], details: (name, email, ...), id: <id>}
@route('/contact/<id>')
def contact(id):
    contdict = getAll()
    contdict['details'] = getDetails(id)
    contdict['id'] = id

    return template('contact.tpl', contdict=contdict)

#add page view, the template is used by the edit view, so initial values are set
#   to blank and the name of the action (add) is given too, content-dictionary in the form:
#   {people: [a,b,...], orgs: [x,y,...], act: 'add', initVal: ["","",...], type: <contact>}
@route('/add/<contact>')
def add(contact):
    contdict = getAll()
    contdict['act'] = 'add'
    contdict['initVal'] = ["","","","","","",contact]

    return template('add.tpl', contdict=contdict)

#addNew form handler, uses a database insert query. Also checks to change
#   person-to-organisation relationship if necessary
#   redirects to the new contact once finished.
@route('/addNew/<contact>', method="GET")
def do_add(contact):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    query = getQuery()
    c.execute("INSERT INTO contact (name, addrOne, addrTwo, addrThree, email, phone, type) VALUES (?,?,?,?,?,?,?)",
        query+(contact,))
    contactid = str(c.lastrowid)
    conn.commit()
    c.close()
    redirect('/contact/'+contactid)

#edit page view, same as the add view except action is set to edit and the id is
#   already known, content-dictionary in the form:
#   {people: [a,b,...], orgs: [x,y,...], act: 'edit', initVal: ["","",...], id: <id>}
@route('/edit/<id>')
def edit(id):
    contdict = getAll()
    contdict['initVal'] = getDetails(id)
    contdict['act'] = 'edit'
    contdict['id'] = id

    return template('add.tpl', contdict=contdict)

#edit form handler, as both organisations and people use the same handler,
#   the person-to-organisation relationship is edited in a seperate query.
#   redirects to the contact once finished
@route('/editContact/<id>', method="GET")
def do_edit(id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    query = getQuery()
    c.execute("UPDATE contact SET name = (?), addrOne = (?), addrTwo = (?), addrThree = (?), email = (?), phone = (?) WHERE id = (?)",
        query+(id,))
    conn.commit()
    c.close()
    redirect('/contact/'+id)

#delete page view, as deleting is a permanent process, this page is used a validator
#   content-dictionary in the form:
#   {people: [a,b,...], orgs: [x,y,...], name: <contact_name>, id: <id>}
@route('/delete/<id>')
def delete(id):
    contdict=getAll()
    contdict['name'] = getName(id)[0]
    contdict['id'] = id

    return template('delete.tpl', contdict=contdict)

#delete handler, removes the contact from the database and any any relationships
#   it may have hande. Redirects to main page
@route('/fullDelete/<id>')
def do_delete(id):
    contdict=getAll()
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("DELETE FROM contact WHERE id = (?)", (id,))
    c.execute("DELETE FROM partOf WHERE person = (?)", (id,))
    c.execute("DELETE FROM partOf WHERE organisation = (?)", (id,))
    conn.commit()
    c.close()

    redirect('/')

#removes people from an organisation, redirects back to the organisation
@route('/remove/<ida>/<idb>')
def do_remove(ida,idb):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT type FROM contact WHERE id = (?)", (ida,))
    if c.fetchone() == ('person',):
        c.execute("DELETE FROM partOf WHERE person = (?) AND organisation = (?)", (ida,idb))
    else:
        c.execute("DELETE FROM partOf WHERE person = (?) AND organisation = (?)", (idb,ida))
    conn.commit()
    c.close()

    redirect('/contact/'+ida)

#adds people to an organisation, redirects back to the organisation
@route('/addPartOf/<id>', method='GET')
def do_addPartOf(id):
    contact = request.query.contact
    if contact == None:
        redirect('/contact/'+id)
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT type FROM contact WHERE id = (?)", (id,))
    if c.fetchone() == ('person',):
        c.execute("INSERT INTO partOf (person, organisation) VALUES (?,?)", (id, contact))
    else:
        c.execute("INSERT INTO partOf (person, organisation) VALUES (?,?)", (contact, id))
    conn.commit()
    c.close()

    redirect('/contact/'+id)

#runs the full website
run(host='localhost', port=8080, debug=True)
