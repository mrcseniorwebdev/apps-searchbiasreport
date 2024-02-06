const [jobs, setJobs] = useState([
    {
        site: "drummondok.com",
        query: "Gentner Drummond attorney general race 2022",
    },
    {
        site: "birdforiowa.com",
        query: "Brenna Bird Attorney General race 2022",
    },
    {
        site: "trudybuschvalentine.com",
        query: "Trudy Busch Senate Race 2022",
    },
]);
const [jobs, setJobs] = useState([
    {
        site: "drummondok.com",
        query: "Gentner Drummond attorney general race 2022",
    },
    {
        site: "birdforiowa.com",
        query: "Brenna Bird Attorney General race 2022",
    },
    {
        site: "trudybuschvalentine.com",
        query: "Trudy Busch Senate Race 2022",
    },
    {
        site: "marshallforalabama.com",
        query: "Steve Marshall Attorney General race 2022",
    },
    {
        site: "wendellmajor.com",
        query: "Wendell Major Attorney General race 2022",
    },
    {
        site: "abeforag.com",
        query: "Abraham Hamadeh Attorney General race 2022",
    },
    {
        site: "krismayes.com",
        query: "Kris Mayes Attorney General race 2022",
    },
    {
        site: "leslierutledge.com",
        query: "Leslie Rutledge Luitenant Governor Race 2022",
    },
    {
        site: "kellyforarkansas.com",
        query: "Kelly Krout Luitenant Governor Race 2022",
    },
    {
        site: "frankgilbert.orgmeet-frank",
        query: "Frank GIlbert Luitenant Governor Race 2022",
    },
    {
        site: "jessegibsonforarkansas.com",
        query: "Jesse Gibson Attorney General race 2022",
    },
    {
        site: "timgriffinforag.com",
        query: "Tim Griffin  Attorney General race 2022",
    },
    {
        site: "robbonta.com",
        query: "Rob Bonta Attorney General race 2022",
    },
    {
        site: "nathanhochman.comabout",
        query: "Nathan Hochman Attorney General race 2022",
    },
    {
        site: "philforcolorado.com",
        query: "Phil Weiser Attorney General race 2022",
    },
    {
        site: "johnkellner.com",
        query: "John Kellner Attorney General race 2022",
    },
    {
        site: "thorneforattorneygeneral.comabout",
        query: "Stanley Thorne Attorney General race 2022",
    },
    {
        site: "williamtong.com",
        query: "William Tong Attorney General race 2022",
    },
    {
        site: "jessicakordas.com",
        query: "Jessica Kordas Attorney General race 2022",
    },
    {
        site: "kenkrayeske.com",
        query: "Ken Krayeske Attorney General race 2022",
    },
    {
        site: "kathyfordelaware.com",
        query: "Kathy Jennings Attorney General race 2022",
    },
    {
        site: "murrayfordelaware.com",
        query: "Julianne Murray Attorney General race 2022",
    },
    {
        site: "ashleymoody.com",
        query: "Ashley Moody Attorney General race 2022",
    },
    {
        site: "aramisayalafl.com",
        query: "Amaris Ayala Attorney General race 2022",
    },
    {
        site: "chriscarrga.com",
        query: "Chris Carr Attorney General race 2022",
    },
    {
        site: "jen4georgia.com",
        query: "Jen Jordan Attorney General race 2022",
    },
    {
        site: "arkooshforag.com",
        query: "Tom Arkoosh Attorney General race 2022",
    },
    {
        site: "labrador2022.com",
        query: "Raúl Labrador Attorney General race 2022",
    },
    {
        site: "kwameraoul.com",
        query: "Kwame Raoul Attorney General race 2022",
    },
    {
        site: "tomdevore.com",
        query: "Thomas DeVore  Attorney General race 2022",
    },
    {
        site: "danrobin4ag.org",
        query: "Dan Robin Attorney General race 2022",
    },
    {
        site: "iowansformiller.com",
        query: "Tom Miller Attorney General race 2022",
    },
    {
        site: "birdforiowa.com",
        query: "Brenna Bird Attorney General race 2022",
    },
    {
        site: "schmidtforkansas.com",
        query: "Derek Schmidt Governor race 2022",
    },
    {
        site: "laurakellyforkansas.com",
        query: "Laura Kelly Governor race 2022",
    },
    {
        site: "cordellforkansas.com",
        query: "Seth Cordell Governor race 2022",
    },
    {
        site: "pyleforkansas.commeet-dennis",
        query: "Dennis Pyle Governor race 2022",
    },
    {
        site: "kriskobach.com",
        query: "Kris Kobach Attorney General race 2022",
    },
    {
        site: "chrismannforkansas.com",
        query: "Chris Mann Attorney General race 2022",
    },
    {
        site: "cameronforkentucky.com",
        query: "Daniel Cameron Governor race 2023",
    },
    {
        site: "governor.ky.gov",
        query: "Andy Beshear Governor race 2023",
    },
    {
        site: "cooperforky.com",
        query: "David Cooper Governor race 2023",
    },
    {
        site: "detersforgovernor.com",
        query: "Eric Deters Governor race 2023",
    },
    {
        site: "mikeharmon.com",
        query: "Mike Harmon Governor race 2023",
    },
    {
        site: "kellycraft.com",
        query: "Kelly Knight Craft Governor race 2023",
    },
    {
        site: "savannahforgovernor.com",
        query: "Savannah Maddox Governor race 2023",
    },
    {
        site: "ryanquarles.com",
        query: "Ryan Quarles Governor race 2023",
    },
    {
        site: "rsmith4gov.com",
        query: "Robbie Smith Governor race 2023",
    },
    {
        site: "jefflandry.com",
        query: "Jeff Landry Governor race 2023",
    },
    {
        site: "lundyforlouisiana.com",
        query: "Hunter Lundy Governor race 2023",
    },
    {
        site: "anthonybrown.com",
        query: "Anthony G. Brown Attorney General race 2022",
    },
    {
        site: "patriots4peroutka.com",
        query: "Michael Anthony Peroutka Attorney General race 2022",
    },
    {
        site: "andreacampbell.org",
        query: "Andrea Campbell Attorney General race 2022",
    },
    {
        site: "attorneyjaymcmahon.com",
        query: "James McMahon Attorney General race 2022",
    },
    {
        site: "dananessel.com",
        query: "Dana Nessel Attorney General race 2022",
    },
    {
        site: "depernoformi.com",
        query: "Matthew DePerno Attorney General race 2022",
    },
    {
        site: "libertystrikesback.com",
        query: "Joe McHugh Attorney General race 2022",
    },
    {
        site: "keithellison.org",
        query: "Keith Ellison Attorney General race 2022",
    },
    {
        site: "jimformnag.com",
        query: "Jim Schultz Attorney General race 2022",
    },
    {
        site: "schmittforsenate.comabout",
        query: "Eric Schmitt Senate Race 2022",
    },
    {
        site: "trudybuschvalentine.com",
        query: "Trudy Busch Senate Race 2022",
    },
    {
        site: "mikehilgers.com",
        query: "Mike Hilgers Attorney General race 2022",
    },
    {
        site: "larrybolinger.comindex.html",
        query: "Larry Bolinger Attorney General race 2022",
    },
    {
        site: "fordfornevada.com",
        query: "Aaron Ford Attorney General race 2022",
    },
    {
        site: "sigalchattah.com",
        query: "Sigal Chattah Attorney General race 2022",
    },
    {
        site: "raultorrez.com",
        query: "Raul Torrez Attorney General race 2022",
    },
    {
        site: "jeremygay.com",
        query: "Jeremy Gay Attorney General race 2022",
    },
    {
        site: "jamesforny.com",
        query: "Letitia James Attorney General race 2022",
    },
    {
        site: "michaelhenryforag.com",
        query: "Michael Henry Attorney General race 2022",
    },
    {
        site: "drewwrigley.com",
        query: "Drew Wrigley Attorney General race 2022",
    },
    {
        site: "facebook.comtimothy.c.lamb.7",
        query: "Timothy Lamb Attorney General race 2022",
    },
    {
        site: "daveyost.com",
        query: "Dave Yost Attorney General race 2022",
    },
    {
        site: "crossmanforohio.com",
        query: "Jeff Crossman Attorney General race 2022",
    },
    {
        site: "drummondok.com",
        query: "Gentner Drummond attorney general race 2022",
    },
    {
        site: "steeleforag.com",
        query: "Lynda Steele attorney general race 2022",
    },
    {
        site: "joshshapiro.org",
        query: "Josh Shapiro Governor race 2022",
    },
    {
        site: "doug4gov.com",
        query: "Doug Mastriano Governor race 2022",
    },
    {
        site: "peterneronha.com",
        query: "Peter Neronha attorney general race 2022",
    },
    {
        site: "chas4ag.com",
        query: "Charles Calenda attorney general race 2022",
    },
    {
        site: "kenpaxton.com",
        query: "Ken Paxton attorney general race 2022",
    },
    {
        site: "rochellegarzafortexas.com",
        query: "Rochelle Garza attorney general race 2022",
    },
    {
        site: "michaeltagliaviaforvermont.com",
        query: "Michael Tagliavia attorney general race 2022",
    },
    {
        site: "charityforvermont.com",
        query: "Charity Clark attorney general race 2022",
    },
    {
        site: "joshkaul.org",
        query: "Josh Kaul attorney general race 2022",
    },
    {
        site: "erictoney.com",
        query: "Eric Toney attorney general race 2022",
    },
]);
