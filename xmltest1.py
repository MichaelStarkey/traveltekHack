import requests
from lxml import etree

# our request xml

testreq = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net" status="Live" type="cruise">
<searchdetail type="cruise" startdate="2017-04-01" enddate="2017-04-30" adults="2" children="0" sid="30115" resultkey="default">
</searchdetail>
</method>
</request>'''

testreq2 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net"
status="Live" type="cruise">
<searchdetail type="cruise" startdate="2017-04-01" enddate="2017-04-30"
adults="2" children="0" sid="30115" resultkey="default">
</searchdetail>
</method>
</request>'''

testreq2 = '''<?xml version="1.0"?>
<request>
<auth username="hackathon" password="pr38ns48" />
<method action="simplesearch" sitename="cruisedemo.traveltek.net"
status="Live" type="cruise">
<searchdetail type="cruise" startdate="2017-04-01" enddate="2017-04-30"
adults="2" children="0" sid="30115" resultkey="default">
</searchdetail>
</method>
</request>'''





def makeRequestPrice (testreq, min,max):
	print (testreq)
	# make the post request to the api url
	r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', 
	data={"xml": testreq})
	# parse the response
	root = etree.fromstring(r.text)
	print (r.text)
	# loop through it and print the hotel name of each result
	for element in root.iterfind("results/cruise"): 
		name=element.get("name") 
		price=element.get("price")
		shipid=element.get("shipid")
		if (price > min) & (price < max) :
			print("{0} is {1} on {2}".format(name, price, shipid))

	
def makeRequestPort (testreq,mustSeeDestination):
	print (testreq)
	# make the post request to the api url
	r = requests.post('https://fusionapi.traveltek.net/0.9/interface.pl', 
	data={"xml": testreq})
	# parse the response
	root = etree.fromstring(r.text)
	print (r.text)
	# loop through it and print the hotel name of each result
	for element in root.iterfind("results/cruise"): 
		name=element.get("name") 
		portid=element.get("portID")
		regionID=element.get("regionID")
		if (portID == mustSeeDestination) :
			print("{0} is {1} on {2}".format(portid, name, regionid))


makeRequestPrice(testreq,"2500","3000")
makeRequestPort(testreq, "2113")





	






