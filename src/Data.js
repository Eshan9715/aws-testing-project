// import one from './assets/one.png'
// import cosco from './assets/cosco.png'
// import cmacgm from './assets/cmacgm.jpg'
// import oocl from './assets/oocl.jpg'
// import maersk from './assets/maersk.png'
// import evergreen from './assets/evergreen.png'
// import msc from './assets/msc.png'
// import ym from './assets/ym.png'
// import happa from './assets/happa.png'
// import pil from './assets/pil.png'
// import hmm from './assets/hmm.png'
import user from './assets/user.png'


// export const ports = [
//     {
//         id:1,
//         portName:'',
//         portCode:'',
//         countryName:'',
//         countryFlag: '',
//     },
// ]

export const tabData = [
    {
        id:1,
        fact: "rates pending",
        topic: "Newest Quries"
    },
    {
        id:2,
        fact: "rates confirmation",
        topic: "Rates Confirmation"
    },
    {
        id:3,
        fact: "schedule pending",
        topic: "Pending Schedules"
    },
    {
        id:4,
        fact: "vessel pending",
        topic: "Vessel Pending"
    },
    {
        id:5,
        fact: "booking",
        topic: "Booking & Release"
    },
    {
        id:6,
        fact: "pending cut-off",
        topic: "Pending Cut-Off"
    },
    {
        id:7,
        fact: "b/l pending",
        topic: "Cutoff | Pending B/L"
    },
    {
        id:8,
        fact: "b/l added",
        topic: "Check | Confirm B/L"
    },
    {
        id:9,
        fact: "complete",
        topic: "Completed Queries"
    },
]

export const ctabData = [
    {
        id:1,
        fact: "schedule pending",
        topic: "Pending Schedules"
    },
    {
        id:2,
        fact: "vessel pending",
        topic: "Vessel Pending"
    },
    {
        id:3,
        fact: "booking",
        topic: "Booking & Release"
    },
    {
        id:4,
        fact: "pending cut-off",
        topic: "Pending Cut-Off"
    },
    {
        id:5,
        fact: "b/l pending",
        topic: "Cutoff | Pending B/L"
    },
    {
        id:6,
        fact: "b/l added",
        topic: "Check | Confirm B/L"
    },
    {
        id:7,
        fact: "complete",
        topic: "Completed Queries"
    },
]

export const tabShiprData = [
    {
        id:1,
        fact: "rates pending",
        topic: "Newest Quries"
    },
    {
        id:2,
        fact: "rates confirmation",
        topic: "Rates Confirmation"
    },
    {
        id:3,
        fact: "schedule pending",
        topic: "Pending Schedules"
    },   
    {
        id:4,
        fact: "vessel pending",
        topic: "Vessel Pending"
    },
    {
        id:5,
        fact: "booking",
        topic: "Booking & Release"
    },
    {
        id:6,
        fact: "pending cut-off",
        topic: "Pending Cut-Off"
    },
    {
        id:7,
        fact: "b/l pending",
        topic: "Cutoff | Pending B/L"
    },
    {
        id:8,
        fact: "b/l added",
        topic: "Check | Confirm B/L"
    },
    {
        id:9,
        fact: "complete",
        topic: "Completed Queries"
    },
]

export const tabConsolData = [
    {
        id:1,
        fact: "rates pending",
        topic: "Newest Quries"
    },
    {
        id:2,
        fact: "rates confirmation",
        topic: "Rates Confirmation"
    },   
    {
        id:3,
        fact: "vessel pending",
        topic: "Vessel Pending"
    },
    {
        id:4,
        fact: "b/l pending",
        topic: "Cutoff | Pending B/L"
    },
    {
        id:5,
        fact: "b/l added",
        topic: "Check | Confirm B/L"
    },
    {
        id:6,
        fact: "complete",
        topic: "Completed Queries"
    },
]

export const salesPersons =[
    {name: 'Venura Silva', img: {user}}, 
    {name: 'Chaminda Perera', img:  {user}}, 
    {name: 'Achala Solomons', img:  {user}}, 
    {name: 'Duminda Perera', img:  {user}}, 
    {name: 'Tharaka Samanpriya', img:  {user}}, 
    {name: 'Nelaka Perera', img:  {user}}, 
    {name: 'Sanoli Peris', img:  {user}}, 
]


export const shipperName =[
    'Venura Silva', 'Chaminda Perera' 
]

export const shipperAddress =[
    '50A Jetawana Road,Colombo-10', ' 77S Galle Road, Colombo -06' 
]

export const shipperTele =[
    '0723453453', '0765675676' 
]

export const shippermail =[
    'e@gmail.com', 'c@gmail.com' 
]


export const consigneeName =[
    'Venura Silva', 'Chaminda Perera' 
]

export const consigneeAddress =[
    '50A Jetawana Road,Colombo-10', ' 77S Galle Road, Colombo -06' 
]

export const consigneeTele =[
    '0723453453', '0765675676' 
]

export const consigneemail =[
    'e@gmail.com', 'c@gmail.com' 
]

export const notifyName =[
    'Venura Silva', 'Chaminda Perera' 
]

export const notifyAddress =[
    '50A Jetawana Road,Colombo-10', ' 77S Galle Road, Colombo -06' 
]

export const notifyTele =[
    '0723453453', '0765675676' 
]

export const notifymail =[
    'e@gmail.com', 'c@gmail.com' 
]

export const markNNvalues =[
    'Marks and Numbers is an optional field used to identify different pieces of cargo so that there is no problem identifying them at the port',
    'orrect and complete marking of packages helps to prevent incorrect handling, accidents, incorrect delivery, losses of weight and volume and Customs fines' 
]
export const cargoDDesc =[
    'Marks and Numbers is an optional field used to identify different pieces of cargo so that there is no problem identifying them at the port',
    'orrect and complete marking of packages helps to prevent incorrect handling, accidents, incorrect delivery, losses of weight and volume and Customs fines' 
]




export const seaRates = [
    {
        origin: 'Colombo, LK',
        shipline: 'MAERSK',
        vdate: 'Friday, 08 FEB 2023',
        discharge: 'Dubai, UAE',
        rates:[
            {
            containerType: "20 GP",
            rate: '1200',
            },
            {
            containerType: "40 GP",
            rate: '2200',
            },
        ],
        deliveryMode: 'CY/DOOR',
        destination: 'Odyssy',
        zipCode: 'UE 1234',
        remarks: 'CY is short for Container Yard. which is where containers are stored on the terminal or dry port before. they are loaded or offloaded from a ship.'
        
    },
    {
        origin: 'Colombo, LK',
        shipline: 'ONE',
        vdate: 'Friday, 18 FEB 2023',
        discharge: 'London, GB',
        rates:[
            {
            containerType: "20 GP",
            rate: '2200',
            },
            {
            containerType: "40 GP",
            rate: '4200',
            },
        ],
        deliveryMode: 'CY/CY',
        destination: '',
        zipCode: '',
        remarks: 'The goods of several clients are put into one container. What are LCL and FCL LCL and FCL are the. two major shipping options available when shipping goods across the sea by containers.'
        
    },
    {
        origin: 'Colombo, LK',
        shipline: 'CMA CGM',
        vdate: 'Friday, 12 FEB 2023',
        discharge: 'Dubai, UAE',
        rates:[
            {
            containerType: "20 GP",
            rate: '1200',
            },
           
        ],
        deliveryMode: 'CY/CY',
        destination: '',
        zipCode: '',
        remarks: 'FCL (Full Container Load) or full container. the clients goods are transported in a filled and sealed container.'
        
    },
  
]

export const vesselSchedule = [
    {
        odate:'Thursday, 02 FEB 2023',
        origin: 'Colombo, LK',
        shipline: 'MAERSK',
        vessel: 'King',
        service: 'service 12345',
        ddate: 'Friday, 08 FEB 2023',
        destination: 'Dubai, UAE',
        transit: 27,
        transhipment: 1,
        rate: 1200,
    },
    {
        odate:'Monday, 03 FEB 2023',
        origin: 'Colombo, LK',
        shipline: 'MAERSK',
        vessel: 'OPERA',
        service: 'service 12345',
        ddate: 'Friday, 12 FEB 2023',
        destination: 'Chennai, IND',
        transit: 37,
        transhipment: 2,
        rate: 2200,
    },
    {
        odate:'Sunday, 05 FEB 2023',
        origin: 'Colombo, LK',
        shipline: 'MAERSK',
        vessel: 'King',
        service: 'service 12345',
        ddate: 'Friday, 15 FEB 2023',
        destination: 'Tokyo, JP',
        transit: 15,
        transhipment: 1,
        rate: 1700,
    },
]

// export const shippingLines = [
//     {
//         icon: one,
//         line: 'ONE'
//     },
//     {
//         icon: maersk,
//         line: 'MAERSK'
//     },
//     {
//         icon: cosco,
//         line: 'COSCO'
//     },
//     {
//         icon: cmacgm,
//         line: 'CMACGM'
//     },
//     {
//         icon: evergreen,
//         line: 'EVERGREEN'
//     },
//     {
//         icon: msc,
//         line: 'MSC'
//     },
//     {
//         icon: happa,
//         line: 'HAPAG-LIYOD'
//     },
//     {
//         icon: ym,
//         line: 'YANG MING'
//     },
//     {
//         icon: hmm,
//         line: 'HMM'
//     },
//     {
//         icon: pil,
//         line: 'PIL'
//     },
//     {
//         icon: oocl,
//         line: 'OOCL'
//     },
  
// ]

export const forwarders = [
    {
        id: 1,
        fname: 'Spedicon'
    },
    {
        id: 2,
        fname: 'Seacare'
    },
    {
        id: 3,
        fname: 'One Team'
    },
    {
        id: 4,
        fname: 'ASL'
    },
    {
        id: 5,
        fname: 'CWT Global Link'
    }
]


export const ports = [
    {
        object: "Dubai",
        objectCode: "AEDXB",
        code:"AE",
        country:"United Arab Emirates",
        state: 'port'
    },
    {
        object: "London",
        objectCode: "GBLON",
        code:"GB",
        country:"United kingdom",
        state: 'port'

    },
    {
        object: "Chennai",
        objectCode: "INMAA6",
        code:"IN",
        country:"India",
        state: 'port'

    },
    {
        object: "Shanghai ",
        objectCode: "CNSGH",
        code:"CN",
        country:"China",
        state: 'port'

    },
    {
        object: "Dubai",
        objectCode: "",
        code:"AE",
        country:"United Arab Emirates",
        state: 'city'
    },
    {
        object: "London",
        objectCode: "",
        code:"GB",
        country:"United kingdom",
        state: 'city'

    },
    {
        object: "Chennai",
        objectCode: "",
        code:"IN",
        country:"India",
        state: 'city'

    },
    {
        object: "Shanghai ",
        objectCode: "",
        code:"CN",
        country:"China",
        state: 'city'

    },
   
];

export const Eports = [
    {
        ObjectName: "Colombo",
        ObjectCode: "LKCMB",
        CountryCode:"LK",
        CountryName:"Srilanka",
        State: 'Port'
    }
]




export const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
        code: 'AG',
        label: 'Antigua and Barbuda',
        phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
];

export const top100Films = [
    { label: 'The Shawshank Redemption', year: 1972, key:"gaman" },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];

export const codes =[
    {name: 'Afghanistan', code: 'AF'}, 
    {name: 'Åland Islands', code: 'AX'}, 
    {name: 'Albania', code: 'AL'}, 
    {name: 'Algeria', code: 'DZ'}, 
    {name: 'American Samoa', code: 'AS'}, 
    {name: 'AndorrA', code: 'AD'}, 
    {name: 'Angola', code: 'AO'}, 
    {name: 'Anguilla', code: 'AI'}, 
    {name: 'Antarctica', code: 'AQ'}, 
    {name: 'Antigua and Barbuda', code: 'AG'}, 
    {name: 'Argentina', code: 'AR'}, 
    {name: 'Armenia', code: 'AM'}, 
    {name: 'Aruba', code: 'AW'}, 
    {name: 'Australia', code: 'AU'}, 
    {name: 'Austria', code: 'AT'}, 
    {name: 'Azerbaijan', code: 'AZ'}, 
    {name: 'Bahamas', code: 'BS'}, 
    {name: 'Bahrain', code: 'BH'}, 
    {name: 'Bangladesh', code: 'BD'}, 
    {name: 'Barbados', code: 'BB'}, 
    {name: 'Belarus', code: 'BY'}, 
    {name: 'Belgium', code: 'BE'}, 
    {name: 'Belize', code: 'BZ'}, 
    {name: 'Benin', code: 'BJ'}, 
    {name: 'Bermuda', code: 'BM'}, 
    {name: 'Bhutan', code: 'BT'}, 
    {name: 'Bolivia', code: 'BO'}, 
    {name: 'Bosnia and Herzegovina', code: 'BA'}, 
    {name: 'Botswana', code: 'BW'}, 
    {name: 'Bouvet Island', code: 'BV'}, 
    {name: 'Brazil', code: 'BR'}, 
    {name: 'British Indian Ocean Territory', code: 'IO'}, 
    {name: 'Brunei Darussalam', code: 'BN'}, 
    {name: 'Bulgaria', code: 'BG'}, 
    {name: 'Burkina Faso', code: 'BF'}, 
    {name: 'Burundi', code: 'BI'}, 
    {name: 'Cambodia', code: 'KH'}, 
    {name: 'Cameroon', code: 'CM'}, 
    {name: 'Canada', code: 'CA'}, 
    {name: 'Cape Verde', code: 'CV'}, 
    {name: 'Cayman Islands', code: 'KY'}, 
    {name: 'Central African Republic', code: 'CF'}, 
    {name: 'Chad', code: 'TD'}, 
    {name: 'Chile', code: 'CL'}, 
    {name: 'China', code: 'CN'}, 
    {name: 'Christmas Island', code: 'CX'}, 
    {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
    {name: 'Colombia', code: 'CO'}, 
    {name: 'Comoros', code: 'KM'}, 
    {name: 'Congo', code: 'CG'}, 
    {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
    {name: 'Cook Islands', code: 'CK'}, 
    {name: 'Costa Rica', code: 'CR'}, 
    {name: 'Cote D\'Ivoire', code: 'CI'}, 
    {name: 'Croatia', code: 'HR'}, 
    {name: 'Cuba', code: 'CU'}, 
    {name: 'Cyprus', code: 'CY'}, 
    {name: 'Czech Republic', code: 'CZ'}, 
    {name: 'Denmark', code: 'DK'}, 
    {name: 'Djibouti', code: 'DJ'}, 
    {name: 'Dominica', code: 'DM'}, 
    {name: 'Dominican Republic', code: 'DO'}, 
    {name: 'Ecuador', code: 'EC'}, 
    {name: 'Egypt', code: 'EG'}, 
    {name: 'El Salvador', code: 'SV'}, 
    {name: 'Equatorial Guinea', code: 'GQ'}, 
    {name: 'Eritrea', code: 'ER'}, 
    {name: 'Estonia', code: 'EE'}, 
    {name: 'Ethiopia', code: 'ET'}, 
    {name: 'England', code: 'GB'}, 
    {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
    {name: 'Faroe Islands', code: 'FO'}, 
    {name: 'Fiji', code: 'FJ'}, 
    {name: 'Finland', code: 'FI'}, 
    {name: 'France', code: 'FR'}, 
    {name: 'French Guiana', code: 'GF'}, 
    {name: 'French Polynesia', code: 'PF'}, 
    {name: 'French Southern Territories', code: 'TF'}, 
    {name: 'Gabon', code: 'GA'}, 
    {name: 'Gambia', code: 'GM'}, 
    {name: 'Georgia', code: 'GE'}, 
    {name: 'Germany', code: 'DE'}, 
    {name: 'Ghana', code: 'GH'}, 
    {name: 'Gibraltar', code: 'GI'}, 
    {name: 'Greece', code: 'GR'}, 
    {name: 'Greenland', code: 'GL'}, 
    {name: 'Grenada', code: 'GD'}, 
    {name: 'Guadeloupe', code: 'GP'}, 
    {name: 'Guam', code: 'GU'}, 
    {name: 'Guatemala', code: 'GT'}, 
    {name: 'Guernsey', code: 'GG'}, 
    {name: 'Guinea', code: 'GN'}, 
    {name: 'Guinea-Bissau', code: 'GW'}, 
    {name: 'Guyana', code: 'GY'}, 
    {name: 'Haiti', code: 'HT'}, 
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
    {name: 'Holy See (Vatican City State)', code: 'VA'}, 
    {name: 'Honduras', code: 'HN'}, 
    {name: 'Hong Kong', code: 'HK'}, 
    {name: 'Hungary', code: 'HU'}, 
    {name: 'Iceland', code: 'IS'}, 
    {name: 'India', code: 'IN'}, 
    {name: 'Indonesia', code: 'ID'}, 
    {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
    {name: 'Iraq', code: 'IQ'}, 
    {name: 'Ireland', code: 'IE'}, 
    {name: 'Isle of Man', code: 'IM'}, 
    {name: 'Israel', code: 'IL'}, 
    {name: 'Italy', code: 'IT'}, 
    {name: 'Jamaica', code: 'JM'}, 
    {name: 'Japan', code: 'JP'}, 
    {name: 'Jersey', code: 'JE'}, 
    {name: 'Jordan', code: 'JO'}, 
    {name: 'Kazakhstan', code: 'KZ'}, 
    {name: 'Kenya', code: 'KE'}, 
    {name: 'Kiribati', code: 'KI'}, 
    {name: 'North Korea', code: 'KP'}, 
    {name: 'South Korea', code: 'KR'}, 
    {name: 'Kuwait', code: 'KW'}, 
    {name: 'Kyrgyzstan', code: 'KG'}, 
    {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
    {name: 'Latvia', code: 'LV'}, 
    {name: 'Lebanon', code: 'LB'}, 
    {name: 'Lesotho', code: 'LS'}, 
    {name: 'Liberia', code: 'LR'}, 
    {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
    {name: 'Liechtenstein', code: 'LI'}, 
    {name: 'Lithuania', code: 'LT'}, 
    {name: 'Luxembourg', code: 'LU'}, 
    {name: 'Macao', code: 'MO'}, 
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
    {name: 'Madagascar', code: 'MG'}, 
    {name: 'Malawi', code: 'MW'}, 
    {name: 'Malaysia', code: 'MY'}, 
    {name: 'Maldives', code: 'MV'}, 
    {name: 'Mali', code: 'ML'}, 
    {name: 'Malta', code: 'MT'}, 
    {name: 'Marshall Islands', code: 'MH'}, 
    {name: 'Martinique', code: 'MQ'}, 
    {name: 'Mauritania', code: 'MR'}, 
    {name: 'Mauritius', code: 'MU'}, 
    {name: 'Mayotte', code: 'YT'}, 
    {name: 'Mexico', code: 'MX'}, 
    {name: 'Micronesia, Federated States of', code: 'FM'}, 
    {name: 'Moldova, Republic of', code: 'MD'}, 
    {name: 'Monaco', code: 'MC'}, 
    {name: 'Mongolia', code: 'MN'}, 
    {name: 'Montserrat', code: 'MS'}, 
    {name: 'Morocco', code: 'MA'}, 
    {name: 'Mozambique', code: 'MZ'}, 
    {name: 'Myanmar', code: 'MM'}, 
    {name: 'Namibia', code: 'NA'}, 
    {name: 'Nauru', code: 'NR'}, 
    {name: 'Nepal', code: 'NP'}, 
    {name: 'Netherlands', code: 'NL'}, 
    {name: 'Netherlands Antilles', code: 'AN'}, 
    {name: 'New Caledonia', code: 'NC'}, 
    {name: 'New Zealand', code: 'NZ'}, 
    {name: 'Nicaragua', code: 'NI'}, 
    {name: 'Niger', code: 'NE'}, 
    {name: 'Nigeria', code: 'NG'}, 
    {name: 'Niue', code: 'NU'}, 
    {name: 'Norfolk Island', code: 'NF'}, 
    {name: 'Northern Mariana Islands', code: 'MP'}, 
    {name: 'Norway', code: 'NO'}, 
    {name: 'Oman', code: 'OM'}, 
    {name: 'Pakistan', code: 'PK'}, 
    {name: 'Palau', code: 'PW'}, 
    {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
    {name: 'Panama', code: 'PA'}, 
    {name: 'Papua New Guinea', code: 'PG'}, 
    {name: 'Paraguay', code: 'PY'}, 
    {name: 'Peru', code: 'PE'}, 
    {name: 'Philippines', code: 'PH'}, 
    {name: 'Pitcairn', code: 'PN'}, 
    {name: 'Poland', code: 'PL'}, 
    {name: 'Portugal', code: 'PT'}, 
    {name: 'Puerto Rico', code: 'PR'}, 
    {name: 'Qatar', code: 'QA'}, 
    {name: 'Reunion', code: 'RE'}, 
    {name: 'Romania', code: 'RO'}, 
    {name: 'Russia', code: 'RU'}, 
    {name: 'RWANDA', code: 'RW'}, 
    {name: 'Saint Helena', code: 'SH'}, 
    {name: 'Saint Kitts and Nevis', code: 'KN'}, 
    {name: 'Saint Lucia', code: 'LC'}, 
    {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
    {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
    {name: 'Samoa', code: 'WS'}, 
    {name: 'San Marino', code: 'SM'}, 
    {name: 'Sao Tome and Principe', code: 'ST'}, 
    {name: 'Saudi Arabia', code: 'SA'}, 
    {name: 'Senegal', code: 'SN'}, 
    {name: 'Serbia and Montenegro', code: 'CS'}, 
    {name: 'Seychelles', code: 'SC'}, 
    {name: 'Sierra Leone', code: 'SL'}, 
    {name: 'Singapore', code: 'SG'}, 
    {name: 'Slovakia', code: 'SK'}, 
    {name: 'Slovenia', code: 'SI'}, 
    {name: 'Solomon Islands', code: 'SB'}, 
    {name: 'Somalia', code: 'SO'}, 
    {name: 'South Africa', code: 'ZA'}, 
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
    {name: 'Spain', code: 'ES'}, 
    {name: 'Sri Lanka', code: 'LK'}, 
    {name: 'Sudan', code: 'SD'}, 
    {name: 'Suriname', code: 'SR'}, 
    {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
    {name: 'Swaziland', code: 'SZ'}, 
    {name: 'Sweden', code: 'SE'}, 
    {name: 'Switzerland', code: 'CH'}, 
    {name: 'Syrian Arab Republic', code: 'SY'}, 
    {name: 'Taiwan, Province of China', code: 'TW'}, 
    {name: 'Tajikistan', code: 'TJ'}, 
    {name: 'Tanzania, United Republic of', code: 'TZ'}, 
    {name: 'Thailand', code: 'TH'}, 
    {name: 'Timor-Leste', code: 'TL'}, 
    {name: 'Togo', code: 'TG'}, 
    {name: 'Tokelau', code: 'TK'}, 
    {name: 'Tonga', code: 'TO'}, 
    {name: 'Trinidad and Tobago', code: 'TT'}, 
    {name: 'Tunisia', code: 'TN'}, 
    {name: 'Turkey', code: 'TR'}, 
    {name: 'Turkmenistan', code: 'TM'}, 
    {name: 'Turks and Caicos Islands', code: 'TC'}, 
    {name: 'Tuvalu', code: 'TV'}, 
    {name: 'Uganda', code: 'UG'}, 
    {name: 'Ukraine', code: 'UA'}, 
    {name: 'UAE', code: 'AE'}, 
    {name: 'United Arab Emirates', code: 'AE'}, 
    {name: 'United Kingdom', code: 'GB'}, 
    {name: 'America', code: 'US'}, 
    {name: 'United States of Ameica', code: 'US'}, 
    {name: 'Uruguay', code: 'UY'}, 
    {name: 'Uzbekistan', code: 'UZ'}, 
    {name: 'Vanuatu', code: 'VU'}, 
    {name: 'Venezuela', code: 'VE'}, 
    {name: 'Viet Nam', code: 'VN'}, 
    {name: 'Virgin Islands, British', code: 'VG'}, 
    {name: 'Virgin Islands, U.S.', code: 'VI'}, 
    {name: 'Wallis and Futuna', code: 'WF'}, 
    {name: 'Western Sahara', code: 'EH'}, 
    {name: 'Yemen', code: 'YE'}, 
    {name: 'Zambia', code: 'ZM'}, 
    {name: 'Zimbabwe', code: 'ZW'} 
    ]

export const booking = [
    {
        id:1,
        bookingID: "AE09878987",
        oport: "Colombo",
        dport: "Chennai",
        route: "Colombo - Chennai",
        containerMode:"FCL",
        containers: [
            {
                id:1,
                containerType: "40FT",
                containerCount: 1,
            }
        ],
        status: "Booking in progress",
        date: "4 FEB 2023",
    },
    {
        id:2,
        bookingID: "QE05678987",
        oport: "Colombo",
        dport: "Sydney",
        containerMode:"FCL",
        route: "Colombo - Sydney",
        containers: [
            {
                id:1,
                containerType: "40FT",
                containerCount: 1,
            },
            { 
                id:2,
                containerType: "20FT",
                containerCount: 2,
            }
        ],
        status: "Booking completed",
        date: "1 MAR 2023",
    },
    {
        id:3,
        bookingID: "RE01232987",
        oport: "Colombo",
        dport: "Dubai",
        route: "Colombo - Dubai",
        containerMode:"FCL",
        containers: [
            {
                id:1,
                containerType: "40FT",
                containerCount: 1,
            },
          
        ],
        status: "Booking in progress",
        date: "14 MAR 2023",
    },
    {
        id:4,
        bookingID: "AT09878987",
        oport: "colombo",
        dport: "Tokyo",
        route: "Colombo - Tokyo",
        containerMode:"FCL",
        containers: [
            {
                id:1,
                containerType: "40FT",
                containerCount: 1,
            },
            { 
                id:2,
                containerType: "20FT",
                containerCount: 2,
            }
        ],
        status: "Booking completed",
        date: "23 FEB 2023",
    },
]

// export const exports = [
//         {
//             id:1,
//             port: "Dubai",
//             rate: 725,
//             flag:'https://flagcdn.com/20x15/ae.png',
//             containerMode: "FCL",
//             containerType: "40ft",
//             validPeriod: "4 feb 2023",
//             shipline:'One',
//             slogo:one,
//             vessel:"TRIBUTE"

//         },
//         {
//             id:2,
//             port: "Tokyo",
//             rate: 625,
//             flag:'https://flagcdn.com/20x15/jp.png',
//             containerMode: "FCL",
//             containerType: "20ft",
//             validPeriod: "1 feb 2023",
//             shipline:'MAERSK',
//             slogo:maersk,
//             vessel:"TRIBUTE"

//         },
//         {
//             id:3,
//             port: "CapeTown",
//             rate: 925,
//             flag:'https://flagcdn.com/20x15/za.png',
//             containerMode: "FCL",
//             containerType: "40ft",
//             validPeriod: "2 feb 2023",
//             shipline:'CMA',
//             slogo:cmacgm,
//             vessel:"TRIBUTE"

//         },
//         {
//             id:4,
//             port: "Wellington",
//             rate: 435,
//             flag:'https://flagcdn.com/20x15/nz.png',
//             containerMode: "FCL",
//             containerType: "20ft",
//             validPeriod: "7 feb 2023",
//             shipline:'EVERGREEN',
//             slogo:evergreen,
//             vessel:"TRIBUTE"

//         },
//         {
//             id:5,
//             port: "Moscow",
//             rate: 765,
//             flag:'https://flagcdn.com/20x15/ru.png',
//             containerMode: "FCL",
//             containerType: "20ft",
//             validPeriod: "2 feb 2023",
//             shipline:'One',
//             slogo:cosco,
//             vessel:"TRIBUTE"

//         },
//         {
//             id:6,
//             port: "London",
//             rate: 715,
//             flag:'https://flagcdn.com/20x15/gb-eng.png',
//             containerMode: "FCL",
//             containerType: "40ft",
//             validPeriod: "1 feb 2023",
//             shipline:'One',
//             slogo:one,
//             vessel:"TRIBUTE"

//         },
//     ]

export const gridParts = [
        {
            id:1,
            desc: "Queries",
            val: 5,
            icon: <svg fill="none" stroke="currentColor" className="w-12 h-12 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
          </svg>
        },
        {
            id:2,
            desc: "Bookings",
            val: 3,
            icon: <svg fill="none" stroke="currentColor" className="w-12 h-12 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
          </svg>
        },
        {
            id:3,
            desc: "Alerts",
            val: 2,
            icon:<svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"></path>
          </svg>
        },
        {
            id:4,
            desc: "Todos",
            val: 10,
            icon:<svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"></path>
          </svg>
        },
]
   
export const recentSearches = [
    {
        id:1,
        originPort: "Colombo",
        originCode: "LKCMB",
        originCountry: "Sri lanka",
        departPort: "Dubai",
        departCode: "AEDXB",
        departCountry: "UAE",
        containerMode: "FCL",
        containers: [
            {
                id:1,
                containerType: "40FT",
                containerCount: 1,
            },
            { 
                id:2,
                containerType: "20FT",
                containerCount: 2,
            }
        ],
       
 
    },
    {
        id:2,
        originPort: "Colombo",
        originCountry: "Sri lanka",
        originCode: "LKCMB",
        departPort: "Los Angelis",
        departCountry: "USA",
        departCode: "USLAS",
        containerMode: "FCL",
        containers: [
            {
                id:1,
                containerType: "20FT",
                containerCount: 1,
            }
        ],
       
 
    },
    {
        id:3,
        originPort: "Mumbai",
        originCountry: "India",
        originCode: "INMBI",
        departPort: "Beijing",
        departCountry: "China",
        departCode: "CHBJG",
        containerMode: "FCL",
        containers: [
            {
                id:1,
                containerType: "40FT",
                containerCount: 1,                          
            }
        ],
       
 
    },
  
]

export const recentAct = [
    {
        id:1,
        act: "BL cut-off dates very close.",
        date: "2023.01.29",
        state: "Important"
    },
    {
        id:2,
        act: "Shipment has to be ready.",
        date: "2023.01.31",
        state: "Urgent"
    },
    {
        id:3,
        act: "Call for Mr.samantha.",
        date: "2023.01.30",
        state: "Urgent"
    },
    {
        id:4,
        act: "Sending a confirmation booking.",
        date: "2023.01.29",
        state: "Important"
    },
    {
        id:5,
        act: "Receiving a confirmation booking.",
        date: "2023.01.31",
        state: "Urgent"
    },

]

export const recentMails = [
    {
        id:1,
        act: "BL cut-off dates very close.",
        date: "2023.01.29",
        state: "Important",
        sender: "Mahinda Perera"
    },
    {
        id:2,
        act: "Shipment has to be ready.",
        date: "2023.01.31",
        state: "Urgent",
        sender: "Saman kaldera"

    },
    {
        id:3,
        act: "Call for Mr.samantha.",
        date: "2023.01.30",
        state: "Urgent",
        sender: "Srimal Bandara"

    },
    {
        id:4,
        act: "Sending a confirmation booking.",
        date: "2023.01.29",
        state: "Important",
        sender: "Nimal costa"


    },
    {
        id:5,
        act: "Sending a confirmation booking.",
        date: "2023.01.31",
        state: "Urgent",
        sender: "Thamal silva"


    }

]

