import requests
from lxml import etree

testreq = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net" status="Live" type="cruise">
<searchdetail type="cruise" startdate="2017-04-01" enddate="2017-04-30" adults="2" children="0" sid="30115" resultkey="default" regionid="2">
</searchdetail>
</method>
</request>'''

print(testreq)

r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":testreq})
root = etree.fromstring(r.text)

f = open('data2.txt', 'w')
f.write(r.text)
print(r.text)
i = 0
sk = root.get("sessionkey")
rn = []
for e in root.iterfind("results/cruise"):
    i += 1
    name = e.get("name")
    price = e.get("price")
    r = e.get("resultno")
    rn.append(r)
    print("{0} is {1} at {2}".format(name, price, r))

print(i)
print(sk)

testreq='''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="getcabingrades" sessionkey="'''+str(sk)+'''" resultno="'''+str(rn[0])+'''">
</method>
</request>'''

r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":testreq})
root = etree.fromstring(r.text)

f = open('data.txt', 'w')
f.write(r.text)
for x in root.iterfind('results/itinerary/item'):
    print(x.attrib)
    desc = x.get("description")
    print(desc)
    ll = [x.get("latitude"), x.get("longitude")]
    print(ll)
