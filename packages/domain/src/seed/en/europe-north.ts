import type { EnArtifact } from "./types";

const n = (title: string, body: string) => ({ title, body });

/** 아서왕·기사 전설과 북유럽·게르만 신화의 영어 번역 */
export const EN_EUROPE_NORTH: Record<string, EnArtifact> = {
  clarent: {
    title: "Clarent",
    owner: "King Arthur, later Mordred",
    maker: "Unknown",
    power: "A sword of peace used to dub knights, which became the blade that felled a king.",
    firstRecord: "Alliterative Morte Arthure",
    summary: "Arthur's sword for ceremony rather than war. His nephew Mordred stole it and dealt Arthur a mortal wound.",
    story: `The late fourteenth-century English poem known as the Alliterative Morte Arthure says Arthur had another sword besides Excalibur. Clarent was a "sword of peace" used for dubbing knights and at feasts, and it was carefully stored in the treasury at Wallingford Castle.

While Arthur was away campaigning against Rome, his nephew Mordred, left in charge of the kingdom, seized the throne and took this sword as well. When the two met at the battle of Camlann, Mordred struck Arthur with Clarent, and Arthur fell from the wound.

That a sword made for peace became the sword that killed the king is counted among the bitterest touches at the end of the Arthurian story.`,
    imageAlt: "An Italian two-handed sword of the fifteenth to sixteenth century with a long straight blade, a wide cross guard with a ring-shaped hand guard, a black grip and a round pommel.",
    annotations: [
      n("Cross guard", "The guard extending straight on both sides made a knight's sword look like a cross. Clarent was a 'sword of peace' used at coronations and dubbing ceremonies."),
      n("Guard ring", "The small ring below the guard protects the finger hooked over the blade. Mordred stole this ceremonial sword for his rebellion."),
      n("Long blade", "A long blade held in two hands. At Camlann Mordred gave Arthur a mortal wound, and in some traditions that sword was Clarent."),
    ],
  },
  carnwennan: {
    title: "Carnwennan",
    owner: "King Arthur",
    maker: "Unknown",
    power: "Thrown, it cleaves a witch in two.",
    firstRecord: "Welsh tale Culhwch and Olwen",
    summary: "Arthur's dagger, “little white hilt,” one of his oldest weapons in Welsh tradition.",
    story: `In Culhwch and Olwen, a Welsh tale recorded around the eleventh century, Arthur lists his most prized possessions and names the dagger Carnwennan. The name means "little white hilt" in Welsh.

At the end of the tale Arthur goes to find the Very Black Witch in the uplands of Hell. When his men fall one after another, Arthur steps forward himself and throws Carnwennan, and the dagger splits the witch in two.

Modern games and novels often say this dagger hides its wielder in shadow. In the Welsh sources, however, the power of concealment belongs to Arthur's mantle, Gwenn.`,
    imageAlt: "A fourteenth-century roundel dagger, possibly British. A thin pointed blade is backed by a disk-shaped guard and pommel.",
    annotations: [
      n("Slender point", "The awl-like point was made to pass between the rings of mail. Arthur split a witch in two with Carnwennan."),
      n("Disk guard", "The round disk between blade and grip protects the hand. Daggers like this are called roundel daggers."),
      n("Disk pommel", "A disk at the end of the grip keeps the hand from slipping. In Welsh the name means 'little white hilt.'"),
    ],
  },
  rhongomyniad: {
    title: "Rhongomyniad",
    owner: "King Arthur",
    maker: "Unknown",
    power: "Long and broad-bladed, said to thirst for enemy blood.",
    firstRecord: "Welsh tale Culhwch and Olwen",
    summary: "King Arthur's spear. It first appears in Welsh tradition alongside Excalibur, there called Caledfwlch.",
    story: `In Culhwch and Olwen, the list of treasures Arthur says he will never give away includes the sword Caledfwlch, the dagger Carnwennan and the spear Rhongomyniad. The name is roughly interpreted as "cutting spear."

In the twelfth century Geoffrey of Monmouth's History of the Kings of Britain calls this spear Ron and describes it as long, broad-bladed and thirsty for blood in battle. Arthur fought the Saxons with it, together with Caliburnus and the shield Pridwen.

Though overshadowed by Excalibur's fame, it is a weapon never left out when describing Arthur fully armed.`,
    imageAlt: "A Carolingian or Ottonian winged lance head of the ninth to tenth century. Short wings project from either side below the long, slender steel blade.",
    annotations: [
      n("Spear point", "A long, sharply tapered point. Rhongomyniad is named in Culhwch and Olwen among Arthur's prized treasures."),
      n("Ridge of the blade", "A ridge rising along the center of the blade gives firm support to the thin steel."),
      n("Wings", "The wings projecting below the blade keep the spear from sinking too deep in a body. This is the winged spear of the Carolingian era."),
    ],
  },
  prydwen: {
    title: "Prydwen",
    owner: "King Arthur",
    maker: "Unknown",
    power: "With the Virgin painted inside, it guarded Arthur in battle.",
    firstRecord: "Geoffrey of Monmouth, History of the Kings of Britain",
    summary: "Arthur's shield and, in Welsh poetry, the name of the ship he sailed to the otherworld.",
    story: `Geoffrey of Monmouth writes that when Arthur set out for the battle of Bath he hung a round shield called Pridwen on his shoulder. The Virgin Mary was painted on its inner side, so that Arthur would keep her in mind throughout the fight.

In the older Welsh poem Preiddeu Annwfn, Prydwen is not a shield but a ship. Arthur and his men sail it to the otherworld of Annwfn to seize a magic cauldron, but only seven return.

Its two faces, shield and ship, are traces of a single name becoming different objects as it passed through different traditions.`,
    imageAlt: "An Italian parade shield from Milan, about 1570. Saint Paul falling from his horse amid soldiers is densely embossed on steel enriched with gold and silver.",
    annotations: [
      n("Upper medallion", "Small round pictures run around the rim. Prydwen is both Arthur's shield and the ship that sailed to the otherworld."),
      n("Central scene", "Saint Paul falling from his horse and startled soldiers are densely embossed here. Arthur is said to have had the Virgin Mary painted inside his shield."),
      n("Gold and silver", "Gold and silver on the steel make the light alternate. It is a shield for processions and ceremony rather than combat."),
    ],
  },
  hauteclere: {
    title: "Hauteclere",
    owner: "Oliver",
    maker: "Unknown",
    power: "A “high and clear” blade to rival Roland's Durendal.",
    firstRecord: "The Song of Roland",
    summary: "The sword of prudent Oliver, one of Charlemagne's twelve peers, who fought beside Roland to the end.",
    story: `If Roland is brave in The Song of Roland, his friend Oliver is wise. Hauteclere, whose name means "high and clear," is Oliver's sword, with a golden hilt and a pommel of crystal.

When the great Saracen host poured into the pass of Roncevaux, Oliver asked three times that the horn be blown to call Charlemagne. Roland refused for honor's sake. Oliver fought with Hauteclere to the last and, blinded by blood, struck his friend Roland by mistake, then died begging forgiveness.

Named in the same poem with Roland's Durendal and Charlemagne's Joyeuse, it is one of the three swords of Frankish chivalry.`,
    imageAlt: "A Western European steel sword of about 1400 with a straight double-edged blade, a cross guard extending sideways and a round pommel.",
    annotations: [
      n("Pommel", "A round pommel. In The Song of Roland, Oliver's Hauteclere has a golden hilt set with crystal."),
      n("Down-curved guard", "A guard whose ends curve slightly toward the blade, a common form on European swords around 1400."),
      n("Clear blade", "Hauteclere means 'high and clear.' Oliver fought Roland for five days without a decision."),
    ],
  },
  joyeuse: {
    title: "Joyeuse",
    owner: "Charlemagne",
    maker: "Unknown",
    power: "Changes color thirty times a day, and holds the point of the Holy Lance in its hilt.",
    firstRecord: "The Song of Roland",
    summary: "Charlemagne's sword, named “joy,” which became the coronation sword of the kings of France.",
    story: `The Song of Roland sings that Charlemagne's sword Joyeuse changes color thirty times a day. The point of the lance that pierced Christ was set in its pommel, and the Frankish battle cry "Montjoie" was said to come from this sword.

After Roland fell, Charlemagne took this sword against the Saracen king Baligant. When the fight dragged on the angel Gabriel appeared and renewed his strength, and Charlemagne split his enemy's helmet with Joyeuse and won.

A coronation sword remade over several centuries is preserved in the Louvre in Paris under the name Joyeuse. The kings of France received it when they took the throne.`,
    imageAlt: "A cross-hilted sword with a hilt made in London and a blade from Solingen in the early seventeenth century. Silver-decorated guard, wire-wrapped grip and gold lettering on the upper blade are visible.",
    annotations: [
      n("Pommel", "A ball pommel patterned in silver. Legend says Joyeuse's pommel held the tip of the lance of Longinus."),
      n("Silver-mounted guard", "Silver plaques run along the wide guard. Charlemagne's sword is sung of as changing color thirty times a day."),
      n("Blade with gold lettering", "Gold letters are cut into the upper blade. The Joyeuse handed down as the coronation sword of French kings is also decorated on the blade."),
    ],
  },
  tizona: {
    title: "Tizona",
    owner: "El Cid (Rodrigo Díaz de Vivar)",
    maker: "Unknown",
    power: "Enemies trembled at the mere sight of its blade.",
    firstRecord: "The Poem of the Cid",
    summary: "The sword the Castilian hero El Cid won in the fight for Valencia.",
    story: `In The Poem of the Cid, the oldest epic in Spanish literature, El Cid pursues and defeats the Moroccan king Búcar, who has marched on Valencia, and takes his sword Tizona.

El Cid later gave this sword and Colada to his two sons-in-law. But when they disgraced him by abandoning his daughters in a forest, he recovered both swords in a trial before the king and restored his honor by duel.

The Museum of Burgos holds a sword long handed down as El Cid's Tizona. Part of its blade has been analyzed as eleventh-century work from Islamic Spain.`,
    imageAlt: "A black-and-white photograph of a late fifteenth-century Spanish sword in its scabbard, standing vertically, with a densely decorated hilt and long scabbard.",
    annotations: [
      n("Hilt and guard", "A hilt decorated with gold and enamel. El Cid took Tizona after defeating the Moroccan king Búcar, who had marched on Valencia."),
      n("Scabbard fittings", "Lozenge-shaped metal mounts run up and down the scabbard. The hilt of the Tizona preserved in the Museum of Burgos was also made later."),
      n("Scabbard tip", "The tip of the scabbard is capped with metal to resist wear. In The Poem of the Cid, enemies who saw Tizona fled in terror."),
    ],
  },
  colada: {
    title: "Colada",
    owner: "El Cid",
    maker: "Unknown",
    power: "A finely tempered sword worth a thousand marks.",
    firstRecord: "The Poem of the Cid",
    summary: "The sword El Cid seized from the Count of Barcelona, the partner of Tizona.",
    story: `Early in The Poem of the Cid, the exiled El Cid fights and captures Count Ramón of Barcelona. The sword he wins is Colada, and the poem stresses that it is worth a thousand marks.

The name Colada is interpreted as "well-cast" or tempered steel. El Cid carried it himself in battle, then passed it on with Tizona to his sons-in-law.

After their betrayal he recovered both swords, and his knights defeated the sons-in-law in single combat. The two swords are remembered as a pair symbolizing El Cid's honor.`,
    imageAlt: "A Spanish sword of about 1500 with a straight blade, a simple cross guard and a leather-wrapped grip.",
    annotations: [
      n("Square pommel", "A boxy, angular pommel, characteristic of Spanish swords around 1500."),
      n("Hooked guard", "The ends of the guard bend toward the blade to catch an opponent's sword. El Cid took Colada from the Count of Barcelona."),
      n("Fuller in the blade", "The shallow groove down the middle lightens the blade while keeping it firm. El Cid gave Colada and Tizona to his sons-in-law, then took them back."),
    ],
  },
  curtana: {
    title: "Curtana",
    owner: "Kings of England (in legend, Tristan or Ogier)",
    maker: "Unknown",
    power: "The broken-tipped “sword of mercy,” signifying a king's power to forgive rather than punish.",
    firstRecord: "Record of the coronation of Queen Eleanor of England",
    summary: "The pointless sword of English coronations. Legend says an angel broke off its tip.",
    story: `Curtana is a sword borne at the coronation of English monarchs; its name first appears in the record of the 1236 coronation of Eleanor, queen of Henry III. Its tip is cut blunt, and so it is also called the "sword of mercy."

Legend says it originally belonged to Tristan of the Round Table or to Ogier, a knight of Charlemagne. When Ogier in fury was about to strike Charlemagne's son, an angel came down from heaven, broke off the tip and told him mercy was better than justice.

The Curtana now in the Tower of London was remade in the seventeenth century, but it still keeps the form without a point.`,
    imageAlt: "The hilt of an English basket-hilted sword of the early seventeenth century. Steel bars embossed with silver scrolls are woven into a basket around the hand.",
    annotations: [
      n("Pommel", "A round pommel embossed with silver scrollwork."),
      n("Basket hilt", "Steel bars are woven into a basket that encloses the whole hand, a type favored by English cavalry in the seventeenth century."),
      n("Base of the blade", "The photograph ends at the base of the blade. The Curtana of the English coronation has a blunt, cut-off tip, read as a sign of mercy."),
    ],
  },
  tyrfing: {
    title: "Tyrfing",
    owner: "King Svafrlami, Angantýr, Hervör",
    maker: "The dwarves Dvalin and Durin",
    power: "Each time it is drawn someone must die, and it brings about three great evils.",
    firstRecord: "Hervarar Saga",
    summary: "A sword cursed by dwarves forced to make it for a king. It destroyed its owners' family one by one.",
    story: `In the thirteenth-century Icelandic Hervarar Saga, King Svafrlami captured the dwarves Dvalin and Durin outside their rock and forced them to forge a sword that would never rust, would cut anything and would never miss.

The dwarves delivered a dazzling sword with a golden hilt, and laid a curse on it. Each time it left the scabbard a man must die, three great evils would be done with it, and at last it would kill its master.

Passed from generation to generation, the sword fulfilled the curse. His granddaughter Hervör won it from her father Angantýr in his grave, and it was present afterward at the tragedy of brothers killing each other.`,
    imageAlt: "A Sasanian sword and scabbard of about the seventh century, lying horizontally. The scabbard and hilt are covered entirely in gold sheet and set with garnets.",
    annotations: [
      n("Golden hilt", "The whole hilt is wrapped in gold sheet. Tyrfing in Hervarar Saga also has a golden hilt and shone even at sunset."),
      n("Garnet-set plaque", "A plaque set with garnets and glass decorates the upper scabbard. Tyrfing had to kill each time it was drawn, and brought about three great evils."),
      n("Scabbard tip", "Scale-patterned gold sheet continues to the end of the scabbard. Sasanian nobles wore such swords hung from two loops on a belt."),
    ],
  },
  hrunting: {
    title: "Hrunting",
    owner: "Unferth, lent to Beowulf",
    maker: "Unknown",
    power: "A patterned steel blade steeped in venom. It had never failed in battle.",
    firstRecord: "Beowulf",
    summary: "The famous sword Beowulf borrowed to fight Grendel's mother. It proved useless against the monster.",
    story: `In the Old English epic Beowulf, Unferth of the Danish court at first mocks Beowulf. But after Beowulf defeats the monster Grendel, Unferth lends him his own sword, Hrunting, for the fight against Grendel's mother.

The poem boasts that its blade is patterned steel steeped in venom and that no one who carried it ever failed in battle. Yet when Beowulf swings Hrunting in the underwater cave, the blade rebounds from the monster's head.

It was the first time the famous sword had failed. Beowulf throws Hrunting aside and ends the fight with a giant's sword hanging on the cave wall.`,
    imageAlt: "A bronze sword, probably Central European, of the thirteenth century BCE. Its slightly swelling leaf-shaped blade is covered in patina.",
    annotations: [
      n("Round pommel", "A disk-shaped bronze pommel. Bronze swords like this come from the graves of warriors in thirteenth-century BCE Central Europe."),
      n("Hilt shoulder", "The hilt grips the blade in a half-moon. Hrunting was the sword Unferth lent to Beowulf."),
      n("Leaf-shaped blade", "A blade slightly swollen at the middle. Hrunting had never failed in many fights, but it could not cut Grendel's mother."),
    ],
  },
  "giant-sword": {
    title: "Giant's Sword",
    owner: "Guarded by Grendel's mother",
    maker: "Ancient giants",
    power: "So large an ordinary man could not lift it. Its blade melted in the monster's blood.",
    firstRecord: "Beowulf",
    summary: "An old sword of the giants hanging on an underwater cave wall, with which Beowulf slew Grendel's mother.",
    story: `With Hrunting useless and Beowulf cornered, his eye fell on an enormous sword hanging on the cave wall. The poem calls it an old sword made by giants, too large for any other man to carry into battle.

With it Beowulf cut down Grendel's mother and struck off the head of the dead Grendel. Then the blade melted like ice in the monster's hot blood, leaving only the hilt.

The golden hilt Beowulf carried back was said to be inscribed in runes with the ancient story of the giants destroyed by the great flood.`,
    imageAlt: "A German two-handed processional sword carried by the guard of Duke Julius of Brunswick, dated 1573, with a man-high blade and long grip.",
    annotations: [
      n("Long grip", "A long leather-wrapped grip for two hands. The 'giant's sword' Beowulf found in the cave of Grendel's mother was too large for an ordinary man to lift."),
      n("Guard and lugs", "Short lugs project below the wide guard to protect the hand when gripping the base of the blade."),
      n("Blade", "After Beowulf slew Grendel's mother, the blade melted like ice in the monster's blood and only the hilt remained."),
    ],
  },
  naegling: {
    title: "Nægling",
    owner: "Beowulf",
    maker: "Unknown",
    power: "The gray blade at old Beowulf's last battle.",
    firstRecord: "Beowulf",
    summary: "The sword the aged king Beowulf carried against a fire-breathing dragon. It broke from his great strength.",
    story: `After ruling for fifty years as king, Beowulf in his old age had to face a dragon burning his land. The sword he carried then was Nægling, the "gray blade."

When Beowulf struck the dragon's head with all his might, Nægling snapped in two. The poem explains that Beowulf's hand was so strong no sword could withstand it.

Young Wiglaf came to help and stabbed the dragon in the belly, and Beowulf finished it with a dagger. But, wounded by the dragon's venom, Beowulf too died on that spot.`,
    imageAlt: "A long sword made in nineteenth-century Europe, possibly France, in fifteenth-century Gothic style, with a decorated straight blade, a down-curved guard and a round pommel.",
    annotations: [
      n("Pommel", "A round pommel with patterned decoration. This sword was made in the nineteenth century in the fifteenth-century Gothic style."),
      n("Down-curved guard", "A thin guard curving toward the blade."),
      n("Patterned blade", "Decoration runs along the whole blade. Nægling snapped the moment Beowulf struck the dragon; his hand was so strong no sword could withstand it."),
    ],
  },
  skofnung: {
    title: "Skofnung",
    owner: "King Hrólfr Kraki",
    maker: "Unknown",
    power: "It holds the spirits of twelve berserkers who guarded the king. Wounds from it do not heal.",
    firstRecord: "Saga of Hrólf Kraki",
    summary: "The sword of the legendary Danish king Hrólfr Kraki. It could not be drawn before women or have sunlight touch its hilt.",
    story: `Skofnung, sword of the legendary Danish king Hrólfr Kraki, appears in several Icelandic sagas. The spirits of the twelve berserkers who guarded the king were said to dwell in it.

The sword had rules. It could not be drawn in sight of a woman, and sunlight could not touch its hilt. A wound from it would not heal unless rubbed with the stone that came with the sword.

After Hrólfr died the sword was buried in his mound, until the Icelander Skeggi opened the grave and took it out, as the Laxdæla Saga relates.`,
    imageAlt: "A late ninth-century Anglo-Saxon sword pommel shaped like a triangular roof, in copper alloy inlaid with silver wire and niello in interlace patterns.",
    annotations: [
      n("Knotwork on the center panel", "Round knotwork in silver wire and niello decorates the center panel, ornament from the ninth century when Anglo-Saxons and Vikings shared the same sea."),
      n("Wing-shaped ornament", "The sides of the pommel slope down like a roof. Skofnung was the sword of the Danish king Hrólfr Kraki, inhabited by the spirits of his twelve champions."),
      n("Animal heads at the ends", "The ends curl up into small heads. Skofnung was not to be drawn in the presence of women or when the sun shone on it."),
    ],
  },
  gjallarhorn: {
    title: "Gjallarhorn",
    owner: "Heimdall the watchman",
    maker: "Unknown",
    power: "When blown it echoes through all the worlds, announcing Ragnarök.",
    firstRecord: "Poetic Edda, Völuspá",
    summary: "The horn of Heimdall, guardian of the rainbow bridge. It announces the last war of the gods.",
    story: `Heimdall is the watchman of Bifröst, the rainbow bridge leading to Asgard, world of the gods. He hardly sleeps, sees a hundred leagues even by night and can hear the grass and the wool grow.

Völuspá sings that when the end of the world comes, Heimdall lifts Gjallarhorn high and blows. The sound rings through the nine worlds, and the gods go out to Ragnarök, their last battle against the giants.

Snorri's Prose Edda also says that in ordinary times this horn lies beside Mímir's well of wisdom, and that Mímir drinks from the well with it and gains wisdom.`,
    imageAlt: "A nineteenth-century plaster cast of a fifteenth-century Danish drinking horn. The curving, tapering horn is densely covered in relief, with a band around the wide mouth.",
    annotations: [
      n("Tip of the horn", "A slender, curving tip. Heimdall stands guard at the edge of the gods' world and blows Gjallarhorn when the giants come."),
      n("Relief decoration", "Vines and beasts cover the whole horn. This photograph shows a plaster copy of a fifteenth-century Danish drinking horn."),
      n("Band at the mouth", "A band runs around the wide mouth. This horn's call, signaling the start of Ragnarök, is said to be heard in all nine worlds."),
    ],
  },
  megingjord: {
    title: "Megingjörð",
    owner: "Thor",
    maker: "Unknown",
    power: "Worn around the waist, it doubles the wearer's strength.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "The thunder god Thor's “belt of strength,” one of his three treasures with Mjölnir and the iron gloves.",
    story: `Snorri's Prose Edda says Thor has three most precious treasures: the hammer Mjölnir, the iron gloves Járngreipr and the belt of strength Megingjörð.

When Thor put on this belt his divine strength doubled. With it he took on the giants, and even hauled the great world-encircling serpent Jörmungandr up from the sea.

In another story the giantess Gríðr lends Thor this belt along with gloves and a staff. Thanks to them Thor manages to survive the palace of the giant Geirröd without his hammer.`,
    imageAlt: "A Frankish iron belt buckle of the late sixth to seventh century. Three rivets with copper-alloy heads are set in a plate inlaid with silver.",
    annotations: [
      n("Three embossed heads", "Three rivets with copper-alloy heads fix the plate. When Thor put on Megingjörð, his strength doubled."),
      n("Silver inlay", "Silver wire set into the iron draws interlaced bands. This is a belt buckle of a Frankish noble of the sixth or seventh century."),
      n("Buckle loop and tongue", "The loop and tongue lock the belt. Thor fought giants equipped with this belt, the iron gloves and Mjölnir."),
    ],
  },
  jarngreipr: {
    title: "Járngreipr",
    owner: "Thor",
    maker: "Unknown",
    power: "Lets a hand hold Mjölnir, hot as lightning, in place of a bare grip.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "Thor's iron gloves. Without them he could not grasp Mjölnir's handle.",
    story: `Járngreipr means "iron grippers." Thor always put on these iron gloves to wield Mjölnir.

Snorri notes briefly that the gloves were essential for gripping the hammer's handle. Later readers explained that this was because Mjölnir grew as hot as lightning and could not be held bare-handed.

When the giant Geirröd threw a red-hot lump of iron at Thor, Thor caught it in his gloved hand and hurled it back, killing Geirröd.`,
    imageAlt: "A locking steel gauntlet from Augsburg, Germany, about 1540. Plates covering the fingers bend into a fist, with gold bands in decoration.",
    annotations: [
      n("Finger plates", "Overlapping steel plates let the fingers bend. Járngreipr are the iron gloves Thor always wore to hold Mjölnir."),
      n("Gold bands", "Gold bands and leaf patterns decorate the wrist and back of the hand, the skill of an Augsburg armorer around 1540."),
      n("Locking mechanism", "When locked with a closed fist, the sword hilt cannot be lost. This is why it is called a locking gauntlet."),
    ],
  },
  brisingamen: {
    title: "Brísingamen",
    owner: "The goddess Freyja",
    maker: "Four dwarves",
    power: "A dazzling golden necklace that enchants all who see it.",
    firstRecord: "Poetic Edda, Lay of Thrym",
    summary: "The necklace of Freyja, goddess of love, over which Loki and Heimdall fought.",
    story: `Brísingamen is the necklace of Freyja, goddess of love and beauty. In the Lay of Thrym, when the giant Thrym steals Thor's hammer and demands Freyja as his bride, she grows so furious that the necklace bursts.

The fourteenth-century Sörla þáttr tells its history. Freyja lost her heart to a necklace made by four dwarves, and won it at the price of spending a night with each of them.

When the trickster god Loki stole the necklace and fled, the watchman Heimdall is said to have changed into a seal, fought Loki and brought it back.`,
    imageAlt: "A Greek gold necklace made in Taranto in southern Italy, fourth to third century BCE. Fine gold chains hang in several layers with a disk bearing a face at the center.",
    annotations: [
      n("Central disk", "A face is carved on the large central disk. Freyja saw this necklace in the forge of four dwarves and paid with a night spent with each."),
      n("End plaques", "Plaques that fasten at the back of the neck. This is goldwork from Taranto in southern Italy, of the fourth to third century BCE."),
      n("Hanging tassel", "Small bell-like tassels swing at the ends of fine gold chains. Loki stole this necklace and Heimdall took it back."),
    ],
  },
  andvaranaut: {
    title: "Andvaranaut",
    owner: "The dwarf Andvari, later Sigurd",
    maker: "The dwarf Andvari",
    power: "Makes gold multiply but destroys everyone who owns it in turn.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "A gold ring cursed by the dwarf it was taken from. The tragedy of the dragon Fafnir and the hero Sigurd begins here.",
    story: `Loki accidentally killed the son of Hreidmar, who had taken the form of an otter, and as compensation had to pay enough gold to cover the otter's skin. Loki caught the dwarf Andvari, hiding in the form of a fish, and took all his gold.

Andvari begged to keep just one small gold ring, because it made gold multiply again. When Loki took the ring as well, Andvari cursed it, saying whoever held the ring and the gold would die.

The curse came true. Hreidmar was killed by his son Fafnir, Fafnir became a dragon guarding the gold and was killed by Sigurd, and Sigurd too lost his life in betrayal.`,
    imageAlt: "A Roman gold snake ring of the first century CE. A serpent winds several times around the finger, with head and tail projecting above and below.",
    annotations: [
      n("Serpent's head", "The upper end of the ring is a snake's head. Robbed of this ring, the dwarf Andvari cursed all who would own it."),
      n("Coiled body", "The serpent winds several times around the finger. Andvaranaut made gold multiply, and for that gold Fafnir killed his father."),
      n("Tail", "The lower end is a tightly curled tail. This is a Roman gold ring of the first century."),
    ],
  },
  skidbladnir: {
    title: "Skíðblaðnir",
    owner: "Freyr, god of fertility",
    maker: "The dwarven sons of Ivaldi",
    power: "Large enough for all the gods, yet folds to fit a pocket. When its sail is raised a fair wind always blows.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "Best of all the ships of the gods. It could be folded like cloth and put in a pocket.",
    story: `Skíðblaðnir is one of the treasures made by the sons of Ivaldi, along with Gungnir and Sif's golden hair. Loki presented them to the gods and made a wager with the dwarf Brokkr.

The Prose Edda says this ship is large enough to carry all the gods in armor, and that when its sail is raised a fair wind always blows wherever it goes. When not in use it could be folded like cloth and carried in a pocket.

The ship was given to Freyr, god of fertility. The Lay of Grímnir calls it the best of ships.`,
    imageAlt: "A Cypriot terracotta ship model of about 600 to 480 BCE with a tall stem and stern and an openwork railing around the hull.",
    annotations: [
      n("High stern", "The end of the boat rises high. Skíðblaðnir was made for Freyr by the sons of the dwarf Ivaldi."),
      n("Openwork bulwark", "The railing is pierced like a lattice. This ship could carry all the gods, yet folded into a pocket when not in use."),
      n("Hull", "A rounded hull. This is a terracotta boat model of the kind placed in Cypriot tombs in the sixth and fifth centuries BCE."),
    ],
  },
  sleipnir: {
    title: "Sleipnir",
    owner: "Odin",
    maker: "Born of Loki",
    power: "With eight legs it runs across sky, sea and the underworld.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "The eight-legged gray horse ridden by the high god Odin, finest of all horses.",
    story: `A mason offered to build the gods a wall in one winter and asked as payment the sun, the moon and the goddess Freyja. The gods agreed, thinking he could never do it, but his horse Svaðilfari hauled enormous stones and the wall was nearly done.

Desperate, the gods pressed Loki, who changed into a mare and lured Svaðilfari into the woods. The work went unfinished, and some time later Loki gave birth to a gray foal with eight legs.

Odin rode this horse, Sleipnir, across sky and earth. When Baldr died, Hermóðr borrowed Sleipnir and rode all the way to Hel to ask for Baldr's return.`,
    imageAlt: "A Greek bronze horse, possibly Corinthian, of the eighth century BCE. A long-legged, slim-bodied horse stands on an openwork base.",
    annotations: [
      n("Head", "A long muzzle and upright ears. This is a horse of the Greek Geometric style of the eighth century BCE."),
      n("Legs", "Long, slender legs carry the body. Odin's horse Sleipnir, with eight legs, ran across earth, sky and even the underworld."),
      n("Pierced base", "Triangular holes are cut in the base. Bronze horses like this were offerings to temples."),
    ],
  },
  aegishjalmur: {
    title: "Helm of Awe",
    owner: "The dragon Fafnir, later Sigurd",
    maker: "Unknown",
    power: "All who look on its wearer are seized by terror.",
    firstRecord: "Poetic Edda, Lay of Fafnir",
    summary: "The helm Fafnir wore as a dragon while guarding his gold. Sigurd took it after slaying the dragon.",
    story: `Having killed Hreidmar and seized the gold, Fafnir changed into a dragon and lay upon it. In the Lay of Fafnir he boasts that because he wore the Helm of Awe, no one dared come near.

Sigurd dug a pit, hid in it, and stabbed the dragon's belly from below as it went to drink. The dying Fafnir admits that the helm did not protect him after all.

Sigurd took the helm along with the gold. Among Icelandic magical symbols today there is a star-shaped design called the Helm of Awe, named after this story.`,
    imageAlt: "A Turkish helmet, probably from Istanbul, about 1560. A pointed steel bowl with gold and silver inlay carries ear and neck guards.",
    annotations: [
      n("Pointed finial", "A small finial at the top of an onion-shaped helmet."),
      n("Gold inlay band", "Letters and patterns in gold run along the lower edge of the helmet, the skill of an Ottoman court workshop around 1560."),
      n("Cheek guards", "Cheek guards with gold inlay hang down. Ægishjálmr is the 'Helm of Awe' that fills all who see the wearer with fear."),
    ],
  },
  tarnhelm: {
    title: "Tarnhelm",
    owner: "The dwarf Alberich, later Siegfried",
    maker: "The dwarf Mime",
    power: "Its wearer can vanish, change into anything or travel far in an instant.",
    firstRecord: "Wagner, Das Rheingold",
    summary: "The magic helmet of Wagner's Ring of the Nibelung, drawn from the medieval “cloak of invisibility.”",
    story: `In Wagner's Das Rheingold, the dwarf Alberich makes a ring from the gold of the Rhine and forces his brother Mime to forge a magic helmet, the Tarnhelm. Whoever wears it can vanish or turn into any shape.

Wotan, king of the gods, and Loge trick Alberich. When he boastfully changes into a great serpent and then a toad, they seize the toad and take the helmet, ring and gold.

Wagner drew this helmet from the invisibility cloak, or Tarnkappe, worn by Siegfried in the medieval German epic the Nibelungenlied. Siegfried later wins the helmet by killing the dragon Fafner.`,
    imageAlt: "A French close helmet made around 1850 in mid-sixteenth-century style. The steel covering the whole face is densely embossed with scrollwork.",
    annotations: [
      n("Visor slit", "The face is fully covered, leaving only a slit for the eyes. In Wagner's Ring, the Tarnhelm lets its wearer vanish or change shape."),
      n("Embossed ornament", "Scrolls and faces are embossed all over. This helmet was made in nineteenth-century France in the style of the sixteenth century."),
      n("Neck guard", "Overlapping plates wrap the neck. The dwarf Mime made the Tarnhelm on the orders of his brother Alberich."),
    ],
  },
};
