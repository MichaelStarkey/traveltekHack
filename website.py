from bottle import route, run, static_file, template, request, redirect
import os
import sqlite3

def getLL(sk, rn):
    for r in rn:
        testreq='''<?xml version="1.0"?>
        <request>
        <auth username="hackathon" password="pr38ns48" />
        <method action="getcabingrades" sessionkey="'''+str(sk)+'''" resultno="'''+str(r)+'''">
        </method>
        </request>'''

        root = etree.fromstring(r.text)
        ll = []
        for x in root.iterfind('results/itinerary/item'):
            ll.append([x.get("latitude"), x.get("longitude")])

@route('/')
def main():
    return template('maptest.tpl')

#static file-path, allows for adding more scripts / styles later
@route('/static/<type>/<filename>')
def server_static(type, filename):
    return static_file(filename, root='static/'+type)

@route('/getCoords/')
def get_coords():
    query = getQuery()
    ll = [query['coords'][0]*(query['ws'][0]/360),q['coords'][1]*(query['ws'][0]/160)]


# runs the full website
run(host='localhost', port='8080', debug=True)
