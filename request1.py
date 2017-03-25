import requests
from lxml import etree
import sqlite3

req1 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net" status="Live" type="cruise">
<searchdetail type="cruise" startdate="2017-04-01" enddate="2017-05-01" adults="2" children="0" sid="30115" resultkey="default" regionid="4">
</searchdetail>
</method>
</request>'''

r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":req1})
root = etree.fromstring(r.text)
print(root.iterfind("results/cruise"))
sk = root.get("sessionkey")
rn = []
cid = []
itin = []
for e in root.iterfind("results/cruise"):
    print('e1',e)
    name = e.get("name")
    price = e.get("price")
    res = e.get("resultno")
    tc = e.get("codetocruiseid")
    cid.append(e.get("codetocruiseid"))
    rn.append(res)
    print("{0} is {1} at {2}".format(name, price, tc))

i = -1
for res in rn[:2]:
    i += 1
    testreq='''<?xml version="1.0"?>
    <request>
    <auth username="hackathon" password="pr38ns48" />
    <method action="getcabingrades" sessionkey="'''+str(sk)+'''" resultno="'''+str(res)+'''">
    </method>
    </request>'''
    r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":testreq})
    root = etree.fromstring(r.text)

    f = open('data.txt', 'w')
    f.write(r.text)
    ll = []
    for x in root.iterfind('results/itinerary/item'):
        desc = x.get("description")
        print(desc)
        ll.append([x.get("latitude"), x.get("longitude")])


f = open("newnew.txt", "w")
f.write(str(ll))
f.close()

f = open("newnew.txt", "r")
print(eval(f.readline())[1])
f.close()

print(cid[0])

#c.execute("INSERT INTO contact (name, addrOne, addrTwo, addrThree, email, phone, type) VALUES (?,?,?,?,?,?,?)"
