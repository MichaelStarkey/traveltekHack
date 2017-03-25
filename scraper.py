import requests
from lxml import etree

date1 = ["2017-04-01","2017-05-01","2017-06-01","2017-07-01","2017-08-01","2017-09-01"]
date2 = ["2017-05-01","2017-06-01","2017-07-01","2017-08-01","2017-09-01","2017-10-01"]

req1 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net" status="Live" type="cruise">
<searchdetail type="cruise" startdate="{0}" enddate="{1}" adults="2" children="0" sid="30115" resultkey="default" regionid="2">
</searchdetail>
</method>
</request>'''

req2 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="getcabingrades" sessionkey="{0}" resultno="{1}">
</method>
</request>'''

big_cid = []
big_rn = []
big_price = []
big_itin = []
big_desc = []

i=4
for t in range(0,5):
    print("for1")
    treq = req1.format(date1[t],date2[t])
    r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":treq})
    print(r.text)
    root = etree.fromstring(r.text)
    sk = root.get('sessionkey')
    cid = []
    rn = []
    p = []
    print("for2")
    for e in root.iterfind("results/cruise"):
        cid.append(e.get("codetocruiseid"))
        rn.append(e.get("resultno"))

    itin = []
    itin_desc = []
    
    for i in range(len(rn)):
        print("for3")
        r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":req2.format(sk,rn[i])})
        root = etree.fromstring(r.text)
        ll = []
        desc = []
        for x in root.iterfind('results/itinerary/item'):
            print("for4")
            desc.append(x.get("description"))
            ll.append([x.get("latitude"), x.get("longitude")])

        itin.append(ll)
        itin_desc.append(desc)

f = open('scraperData.txt', 'w')
f.write(str(big_cid))
f.write(str(big_rn))
f.write(str(big_price))
f.write(str(big_itin))
f.write(str(big_desc))
f.close()
