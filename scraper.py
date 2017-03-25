import requests
from lxml import etree

date1 = ["2017-04-01","2017-05-01","2017-06-01","2017-07-01","2017-08-01","2017-09-01"]
date2 = ["2017-05-01","2017-06-01","2017-07-01","2017-08-01","2017-09-01","2017-10-01"]

req1 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net" status="Live" type="cruise">
<searchdetail type="cruise" startdate="2017-04-01" enddate="2017-05-01" adults="2" children="0" sid="30115" resultkey="default" regionid="4">
</searchdetail>
</method>
</request>'''

req2 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="getcabingrades" sessionkey="{0}" resultno="{1}">
</method>
</request>'''
big_rn = []
big_cid = []
big_itin = []

for i in range(1,4):
    print('i',i)
    r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', data={"xml":req1.format(i)})
    root = etree.fromstring(r.text)
    print(root.iterfind("results/cruise"))
    sk = root.get("sessionkey")
    rn = []
    cid = []
    itin = []
    for e in root.iterfind("results/cruise"):
        print('e1',e)
        i += 1
        name = e.get("name")
        price = e.get("price")
        res = e.get("resultno")
        cid.append(e.get("codetocruiseid"))
        rn.append(r)
        print("{0} is {1} at {2}".format(name, price, r))
