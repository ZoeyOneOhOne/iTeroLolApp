const teamList = [
    // LEC
    lec = [
        { name: 'Fnatic', value: 'Fnatic', reaction: '1014887969808711800', emoji: '<:FNC:1014887969808711800>'},
        { name: 'G2 Esports', value: 'G2 Esports', reaction: '1014887970890842233', emoji: '<:G2:1014887970890842233>'},
        { name: 'Team VItality', value: 'Team VItality', reaction: '1012762647134994562', emoji: '<:VIT:1012762647134994562>'},
        { name: 'Team BDS', value: 'Team BDS', reaction: '1014887968512692324', emoji: '<:BDS:1014887968512692324>'},
        { name: 'Excel', value: 'Excel', reaction: '1014887979354964059', emoji: '<:XL:1014887979354964059>'},
        { name: 'Astralis', value: 'Astralis', reaction: '1014887966331646035', emoji: '<:AST:1014887966331646035>'},
        { name: 'SK Gaming', value: 'SK Gaming', reaction: '1014887976813219942', emoji: '<:SK:1014887976813219942>'},
        { name: 'KOI', value: 'KOI', reaction: '1065285604578959430', emoji: '<:KOI:1065285604578959430>'},
        { name: 'MAD Lions', value: 'MAD Lions', reaction: '1014887972266578000', emoji: '<:MAD:1014887972266578000>'},
        { name: 'Team Heretics', value: 'Team Heretics', reaction: '1065287618939600917', emoji: '<:TH:1065287618939600917>'},
    ],
    // LPL
    lpl = [
        { name: "Anyone's Legend", value: "Anyone's Legend", reaction: '1012798003846848602', emoji: '<:AL:1012798003846848602>'},
        { name: 'Bilibili Gaming', value: 'Bilibili Gaming', reaction: '1012798051288625294', emoji: '<:BLG:1012798051288625294>'},
        { name: 'EDward Gaming', value: 'EDward Gaming', reaction: '1012798052328816683', emoji: '<:EDG:1012798052328816683>'},
        { name: 'FunPlus Phoenix', value: 'FunPlus Phoenix', reaction: '1012798052848902217', emoji: '<:FPX:1012798052848902217>'},
        { name: 'Invictus Gaming', value: 'Invictus Gaming', reaction: '1012798054161715291', emoji: '<:IG:1012798054161715291>'},
        { name: 'JDG Gaming', value: 'JDG Gaming', reaction: '1012798055080271972', emoji: '<:JDG:1012798055080271972>'},
        { name: "LGD Gaming", value: "LGD Gaming", reaction: '1012798056372117534', emoji: '<:LGD:1012798056372117534>'},
        { name: 'LNG Esports', value: 'LNG Esports', reaction: '1012798057529737256', emoji: '<:LNG:1012798057529737256>'},
        { name: 'Ninjas in Pyjamas', value: 'Ninjas in Pyjamas', reaction: '1096291956147093554', emoji: '<:NIP:1096291956147093554>'},
        { name: 'Oh My God', value: 'Oh My God', reaction: '1012798059303931984', emoji: '<:OMG:1012798059303931984>'},
        { name: 'Rare Atom', value: 'Rare Atom', reaction: '1012798060524482670', emoji: '<:RA:1012798060524482670>'},
        { name: 'Team WE', value: 'Team WE', reaction: '1012798068913086475', emoji: '<:WE:1012798068913086475>'},
        { name: "Top Esports", value: "Top Esports", reaction: '1012798062734889030', emoji: '<:TES:1012798062734889030>'},
        { name: 'T T Gaming', value: 'T T Gaming', reaction: '1012798064488104086', emoji: '<:TT:1012798064488104086>'},
        { name: 'Ultra Prime', value: 'Ultra Prime', reaction: '1012798065683476563', emoji: '<:UP:1012798065683476563>'},
        { name: 'Weibo Gaming', value: 'Weibo Gaming', reaction: '1012798067805790289', emoji: '<:WBG:1012798067805790289>'},
    ],
    // LCK
    lck = [
        { name: 'Brion', value: 'Brion', reaction: '1012798381539729539', emoji: '<:BRO:1012798381539729539>'},
        { name: 'Dplus', value: 'Dplus', reaction: '1096293519062220953', emoji: '<:DK:1096293519062220953>'},
        { name: 'DRX', value: 'DRX', reaction: '1012798382655410278', emoji: '<:DRX:1012798382655410278>'},
        { name: 'Freecs', value: 'Freecs', reaction: '1012798387738906624', emoji: '<:KDF:1012798387738906624>'},
        { name: 'Gen.G', value: 'Gen.G', reaction: '1012798384710623244', emoji: '<:GEN:1012798384710623244>'},
        { name: 'Hanwha Life Esports', value: 'Hanwha Life Esports', reaction: '1012798386048618617', emoji: '<:HLE:1012798386048618617>'},
        { name: 'KT Rolster', value: 'KT Rolster', reaction: '1012798388858794025', emoji: '<:KT:1012798388858794025>'},
        { name: 'Nongshim RedForce', value: 'Nongshim RedForce', reaction: '1012798390888828950', emoji: '<:NS:1012798390888828950>'},
        { name: 'SANDBOX Gaming', value: 'SANDBOX Gaming', reaction: '1012798389987065967', emoji: '<:LSB:1012798389987065967>'},
        { name: 'T1', value: 'T1', reaction: '1012798391799009350', emoji: '<:T1:1012798391799009350>'},
    ],
    // LCS
    lcs = [
        { name: '100 Thieves', value: '100 Thieves', reaction: '1012798297250996224', emoji: '<:100T:1012798297250996224>'},
        { name: 'Cloud9', value: 'Cloud9', reaction: '1012798298215698515', emoji: '<:C9:1012798298215698515>'},
        { name: 'Dignitas', value: 'Dignitas', reaction: '1012798300853895198', emoji: '<:DIG:1012798300853895198>'},
        { name: 'Evil Geniuses', value: 'Evil Geniuses', reaction: '1012798302221258782', emoji: '<:EG:1012798302221258782>'},
        { name: 'FlyQuest', value: 'FlyQuest', reaction: '1012798302879756339', emoji: '<:FLY:1012798302879756339>'},
        { name: 'Golden Guardians', value: 'Golden Guardians', reaction: '1012798304146423958', emoji: '<:GG:1012798304146423958>'},
        { name: 'Immortals', value: 'Immortals', reaction: '1012798305320845313', emoji: '<:IMT:1012798305320845313>'},
        { name: 'NRG Esports', value: 'NRG Esports', reaction: '1096293912974458982', emoji: '<:NRG:1096293912974458982>'},
        { name: 'Team Liquid', value: 'Team Liquid', reaction: '1012798306033868843', emoji: '<:TL:1012798306033868843>'},
        { name: 'TSM', value: 'TSM', reaction: '1012798307493486592', emoji: '<:TSM:1012798307493486592>'},
    ],
    // Minor Regions
    minorRegions = [
        { name: 'GAM Esports', value: 'GAM Esports', reaction: '1100074924900626452', emoji: '<:GAM:1100074924900626452> '},
        { name: 'Movistar R7', value: 'Movistar R7', reaction: '1100074928084099204', emoji: '<:R7:1100074928084099204>'},
        { name: 'PSG Talon', value: 'PSG Talon', reaction: '1100074926830002206', emoji: '<:PSG:1100074926830002206>'},
        { name: 'LOUD', value: 'LOUD', reaction: '1100074359592341635', emoji: '<:LOUD:1100074359592341635>'},
        { name: 'DetonatioN FocusMe', value: 'DetonatioN FocusMe', reaction: 'IDN1100074356685680650UMBER', emoji: '<:DFM:1100074356685680650>'},
    ],
 
 // Template Below
 // { name: 'NAME', value: 'VALUE', reaction: 'IDNUMBER', emoji: 'FULLID'},
]

exports.teamList = teamList;
