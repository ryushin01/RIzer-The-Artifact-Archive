import type { EnArtifact } from "./types";

const n = (title: string, body: string) => ({ title, body });

/** 대표 유물 16점의 영어 번역 */
export const EN_FEATURED: Record<string, EnArtifact> = {
  excalibur: {
    title: "Excalibur",
    owner: "King Arthur",
    maker: "The smiths of Avalon (in some traditions, the Lady of the Lake)",
    power: "Cuts through enemy armor, and whoever wears its scabbard does not bleed.",
    firstRecord: "Geoffrey of Monmouth, History of the Kings of Britain",
    summary: "The sword that proved the king of Britain. It came from a lake and returned to one.",
    story: `Excalibur first takes shape in Geoffrey of Monmouth's twelfth-century History of the Kings of Britain, where Arthur's sword is called Caliburnus and is said to have been forged on the isle of Avalon. Caledfwlch in Welsh tradition and Caladbolg in Irish heroic tales are counted as names from the same root.

The scene in which Arthur wins the sword comes down in two forms. In one he pulls it from a stone and becomes king; in the other he receives it from an arm rising out of a lake. Thomas Malory's Le Morte d'Arthur keeps both, explaining that the Lady of the Lake gave him Excalibur after the sword from the stone broke.

Merlin said the scabbard was worth more than the blade, because whoever wore it would not bleed however badly he was wounded. Having lost the scabbard, Arthur took a mortal wound at Camlann and ordered his last knight, Bedivere, to return the sword to the lake. Only at the third throw did a hand rise from the water, catch the sword and vanish.`,
    imageAlt: "A fifteenth-century European hand-and-a-half sword with a straight double-edged blade, cross guard and round pommel.",
    annotations: [
      n("Round pommel", "The round weight at the end of the hilt draws the balance toward the hand, making a long sword easier to wield with one hand."),
      n("Cross guard", "The straight guard made a medieval knight's sword look like a cross. Arthur is often pictured planting this sword in the ground to receive oaths."),
      n("Straight double edge", "The double edge tapers toward the tip, shaped for both cutting and thrusting. Legend says this blade parted enemy armor like cloth."),
      n("Tip", "Malory writes that when Bedivere threw the sword into the lake, a hand rose from the water and caught it."),
    ],
  },
  "holy-grail": {
    title: "Holy Grail",
    owner: "The Fisher King, Joseph of Arimathea",
    maker: "Unknown",
    power: "Grants those who see it the food they desire, and shows itself only to the pure knight.",
    firstRecord: "Chrétien de Troyes, Perceval, the Story of the Grail",
    summary: "The cup of the Last Supper and the vessel the knights of the Round Table searched for to the end.",
    story: `The word graal originally meant a wide, shallow dish. In Chrétien de Troyes's unfinished tale of the 1180s, the young knight Perceval watches a shining grail pass by in the Fisher King's castle, but fails to ask whom it serves and so loses his chance to heal the king.

A few decades later Robert de Boron turned the dish into the cup of the Last Supper. Joseph of Arimathea caught Christ's blood in it at the foot of the cross and carried it west to Britain. From then on the grail was the Holy Grail.

In the thirteenth-century prose Quest of the Holy Grail, the knights of the Round Table scatter to find it. Lancelot's sins keep him from coming near, while his son Galahad, with Percival and Bors, finally stands before it. Galahad dies on the spot, and the Grail is taken up to heaven.

The silver cup in this photograph, said to have been found near Antioch in Syria in the early twentieth century, was once presented as the true Grail and is known as the Antioch "Chalice." It is now thought more likely to be a lamp made in sixth-century Byzantium.`,
    imageAlt: "A gilded silver cup carved with figures among grapevines. Its rounded body sits on a low foot.",
    annotations: [
      n("Rim of the cup", "The inner silver cup is smooth and undecorated. The double structure once prompted the idea that the outer shell was made to honor a cup Christ himself had used."),
      n("Figures in the vine", "The figures seated among the vines are read as Christ and the apostles. Grapes recall the wine of the Eucharist."),
      n("Foot", "The low, wide foot is cited as evidence that this was a lamp to hang or stand rather than a cup."),
    ],
  },
  durandal: {
    title: "Durendal",
    owner: "Roland",
    maker: "Brought to Charlemagne by an angel",
    power: "Never chips, even when struck against rock.",
    firstRecord: "The Song of Roland",
    summary: "The sword of Charlemagne's nephew Roland. It refused to break.",
    story: `In the late eleventh-century epic The Song of Roland, Durendal is the sword Charlemagne gave to his nephew Roland. Its golden hilt was said to hold a tooth of Saint Peter, the blood of Saint Basil, hair of Saint Denis and a piece of the Virgin's clothing.

Commanding the rearguard in the pass of Roncevaux, Roland is surrounded by an ambush. Facing death, he tries to shatter the sword on a rock so that it will not fall to the enemy, but the blade stays whole and the rock splits. The Brèche de Roland in the Pyrenees is said to have been made at that moment.

At last Roland lay down with the sword beneath him, facing the enemy, and died. A sword said to be Durendal is still lodged in the cliff at Rocamadour in France.`,
    imageAlt: "A two-handed Western European sword of the early fifteenth century with a long blade and a wide cross guard.",
    annotations: [
      n("Pommel", "The Song of Roland says relics of the saints were sealed inside the golden hilt."),
      n("Cross guard", "The long grip for two hands and the wide guard suggest the weight of this sword."),
      n("Blade", "Just before his death Roland struck rock with this blade ten times without chipping it."),
      n("Tip", "Roland's last pose, lying on his sword and facing the enemy, was painted throughout the Middle Ages."),
    ],
  },
  mjolnir: {
    title: "Mjölnir",
    owner: "Thor",
    maker: "The dwarf brothers Brokkr and Eitri",
    power: "Smashes anything, and returns to its owner's hand when thrown.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "The hammer of the thunder god Thor. Its short handle is Loki's doing.",
    story: `As punishment for shearing off all the hair of Thor's wife Sif, Loki had to obtain new treasures from the dwarves. He staked his own head on a bet with the dwarf Brokkr that no one could make better treasures than the sons of Ivaldi.

While his brother Eitri worked at the forge, Brokkr could not stop pumping the bellows. Loki, changed into a fly, bit him on the eyelid until blood ran; Brokkr stopped for one moment, and so the last thing they made, a hammer, came out with a slightly short handle.

Even so, the gods judged Mjölnir the finest treasure. Nothing could break it however hard it struck, it came back to Thor's hand however far he threw it, and it could be made small enough to hide in his clothing. People of the Viking Age wore little hammer-shaped amulets around their necks.`,
    imageAlt: "A French war hammer of the mid-fifteenth century. One side of the steel head is a hammer, the other a pointed beak, on a wooden haft.",
    annotations: [
      n("Hammer head", "Loki turned into a fly to interfere, but the head of the hammer came out perfect. Only the handle was short."),
      n("Pointed beak", "The beak on the far side is made to pierce armor. It recalls the hammer Thor used to fell giants."),
      n("Haft and rivets", "Because Brokkr paused at the bellows for one moment, Mjölnir's handle was so short it could be gripped with only one hand."),
    ],
  },
  gungnir: {
    title: "Gungnir",
    owner: "Odin",
    maker: "The dwarven sons of Ivaldi",
    power: "Always strikes its target when thrown.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "The spear of the high god Odin. The first war of the gods began when it was thrown.",
    story: `Gungnir is one of the treasures Loki obtained while commissioning golden hair to replace Sif's. Along with the golden hair and the folding ship Skíðblaðnir, the sons of Ivaldi made this spear.

Runes were carved on its point, and once thrown it never missed. The Poetic Edda's Völuspá sings that the first war in the world began when Odin cast his spear over the host of the Vanir.

On the day of Ragnarök Odin takes up Gungnir to face the great wolf Fenrir. The spear does not miss, but Odin is swallowed by the wolf all the same.`,
    imageAlt: "A European steel spearhead of about 800 to 1000 with a willow-leaf blade and a socket decorated with silver.",
    annotations: [
      n("Spear point", "Gungnir never missed when thrown. The long, slender point suits that story well."),
      n("Spiral pattern", "A spiral inlaid in silver runs through the middle of the blade. Legend says runes were cut into Gungnir's point."),
      n("Silver band on the socket", "A silver band wraps the socket that held the shaft, marking this as a weapon of the Viking Age elite."),
    ],
  },
  gram: {
    title: "Gram",
    owner: "Sigmund, Sigurd",
    maker: "Given by Odin and reforged by the smith Regin",
    power: "Splits an anvil in two and pierces a dragon's heart.",
    firstRecord: "Völsunga Saga",
    summary: "A sword that waited in a tree for its owner. It broke, then was reborn as the sword that slew the dragon.",
    story: `A huge tree grew at the center of King Völsung's hall. On the night of a wedding feast, a one-eyed stranger came in, drove a sword deep into the trunk, said that whoever drew it would own it, and vanished. The stranger was Odin, and only Völsung's son Sigmund could pull the sword free.

In Sigmund's last battle Odin appeared again and held out his spear, and the sword snapped in two. Sigmund's wife kept the pieces and passed them to their son Sigurd.

The smith Regin melted the fragments into a new blade. When Sigurd tested it the anvil split down to its block, and a tuft of wool drifting on the river parted when it touched the edge. With this sword Sigurd stabbed the gold-guarding dragon Fafnir from below. In the German Nibelungenlied and Wagner's operas the same sword appears as Balmung and Nothung.`,
    imageAlt: "A tenth-century Scandinavian Viking sword with a straight double-edged blade, short guard, and a grip decorated with copper and silver.",
    annotations: [
      n("Pommel", "A rounded pommel divided into lobes is typical of Viking swords. It belongs to the age of the sword Sigurd would have held."),
      n("Short guard", "The guard of a Viking sword is short and straight. Its job was less to protect the hand than to join blade and grip firmly."),
      n("Pattern in the blade", "The faint pattern at the center of the blade is the trace of several irons forged together. It recalls Regin reforging the broken Gram."),
    ],
  },
  draupnir: {
    title: "Draupnir",
    owner: "Odin",
    maker: "The dwarf brothers Brokkr and Eitri",
    power: "Every ninth night it drops eight gold rings of equal weight.",
    firstRecord: "Snorri Sturluson, Prose Edda",
    summary: "Odin's self-multiplying gold ring. Its name means “the dripper.”",
    story: `Draupnir was born on the same day and in the same forge as Mjölnir. In their wager with Loki, Brokkr and Eitri made in turn the golden boar Gullinbursti, the gold ring Draupnir and the hammer Mjölnir, and presented them to the gods.

Every ninth night, eight gold rings of exactly the same weight dripped from it. This endlessly growing wealth was the most kingly treasure in a northern society where rulers handed out rings to their followers.

When Odin's son Baldr died, Odin laid the ring on the funeral pyre to burn with him. Hermóðr, who rode down to the underworld, could not bring Baldr back, but Baldr sent Draupnir back to his father.`,
    imageAlt: "A Greek gold ring of the fourth to third century BCE. A face with flowing hair is embossed across the whole oval bezel.",
    annotations: [
      n("Face on the bezel", "A face in relief fills the bezel. Like Draupnir, gold was a symbol of authority that kings gave away."),
      n("Eyes and hair", "Zoom in and you can see the pupils and rippling locks in fine detail. Imagine eight rings like this appearing every ninth night."),
    ],
  },
  aegis: {
    title: "Aegis",
    owner: "Zeus, Athena",
    maker: "Hephaestus, in some traditions",
    power: "Shaken, it raises storms and sends enemy armies fleeing in terror.",
    firstRecord: "Homer, Iliad",
    summary: "The shield borne by Zeus and Athena. The head of Medusa is set at its center.",
    story: `In the Iliad the aegis is a piece of war gear that raises thunder and dark clouds when Zeus shakes it. Athena and Apollo also borrow it and carry it into battle. A hundred golden tassels hung from its edges.

It is described sometimes as a goatskin cloak and sometimes as a shield. Athena on Greek vase paintings covers her shoulders with a leather cape fringed with snakes. When Perseus gave her Medusa's head, Athena set it in the center of the aegis, and from then on enemies who saw it froze where they stood.

The English phrase "under the aegis of," meaning under someone's protection, comes from this shield.`,
    imageAlt: "A black round Italian shield of about 1560. A tangled scene of figures occupies the center, with round medallions holding busts around it, all in relief.",
    annotations: [
      n("Central scene", "A tangle of figures is embossed at the center of the shield. Medusa's head was set at the center of the aegis."),
      n("Left medallion", "A bust in profile sits inside a round medallion on the rim. Renaissance makers loved to transfer ancient myth onto shields."),
      n("Right medallion", "A bust paired with the one on the left. The Iliad says a hundred golden tassels hung from the edge of the aegis."),
      n("Lower medallion", "A reclining figure appears in the bottom medallion. The whole shield is composed like a single picture of a story."),
    ],
  },
  "golden-fleece": {
    title: "Golden Fleece",
    owner: "King Aeëtes of Colchis",
    maker: "The divine ram Chrysomallos",
    power: "Brings prosperity and legitimate kingship to the land that holds it.",
    firstRecord: "Apollonius of Rhodes, Argonautica",
    summary: "A fleece guarded by a sleepless dragon. Jason and the Argonauts crossed the sea to bring it back.",
    story: `Phrixus and Helle, a brother and sister about to be sacrificed by their stepmother, escaped on a flying golden ram. Helle fell into the sea, which became the Hellespont, the "sea of Helle." Reaching Colchis at the far end of the Black Sea, Phrixus sacrificed the ram and gave its fleece to King Aeëtes.

The king hung the fleece on an oak in the grove of Ares and set a sleepless dragon to guard it. Jason, seeking to regain his throne, was ordered to fetch it, and he gathered heroes such as Heracles and Orpheus and launched the Argo.

The trials of yoking fire-breathing bulls and defeating warriors sprung from dragon's teeth were passed with the magic of the king's daughter Medea. When Medea lulled the dragon with herbs, Jason took the fleece and fled into the night sea.

The photograph shows a wild ram's head made of gold in Achaemenid Persia in the sixth to fourth century BCE. Its curling horns and thick neck recall the golden ram Chrysomallos that flew through the sky.`,
    imageAlt: "A Persian gold ornament of a ram's head from the sixth to fourth century BCE, with large curled horns, a long muzzle and patterned hair on the neck.",
    annotations: [
      n("Curled horns", "The great spiraling horns are the sign of the ram. They recall the golden ram Chrysomallos, which flew over the sea carrying Phrixus and Helle."),
      n("Eye and face", "Zoom in and you can see even the wrinkles of the eyelid and muzzle hammered into the gold."),
      n("Hair on the neck", "Thick locks are chased along the neck. The ram's fleece in the myth was pure gold, and the people of Colchis hung it on an oak."),
    ],
  },
  "shield-of-achilles": {
    title: "Shield of Achilles",
    owner: "Achilles",
    maker: "Hephaestus, god of the forge",
    power: "A shield of five layers forged by a god, with the whole world engraved on its face.",
    firstRecord: "Homer, Iliad, Book 18",
    summary: "A shield holding heaven and earth, war and peace on one face. It is counted the first description of a work of art in Western literature.",
    story: `When Achilles's friend Patroclus went out in his borrowed armor and fell to Hector, the armor passed into enemy hands. Seeing her son's grief, the sea goddess Thetis went to the forge of Hephaestus and asked for new arms.

Book 18 of the Iliad follows the making of the shield for more than a hundred and thirty lines. At the center are earth, sky and sea, the sun, moon and constellations. Around them a city at peace, with wedding feasts and a trial, faces a city at war, besieged and preparing an ambush.

Farmers plowing, children picking grapes, cattle attacked by lions and young people dancing in a circle follow one after another, and the river Oceanus runs around the outermost edge. Taking up the shield, Achilles returns to battle and kills Hector.

The photograph is a close view of the parade shield of Henry II of France. Scenes of cavalry combat are embossed on its steel surface and enriched with gold and silver.`,
    imageAlt: "A close view of the lower part of the steel shield of Henry II of France, about 1555. A cavalry battle fills the central oval, with figure medallions and floral relief around it and rivets along the edge.",
    annotations: [
      n("Central battle scene", "Mounted soldiers grapple in battle. On the shield of Achilles, Hephaestus engraved a besieged 'city at war.'"),
      n("Medallions around it", "Figures also fill the round medallions around the battle. The shield in the Iliad likewise layered its scenes in concentric rings."),
      n("Rivets at the edge", "Golden rivets run along the rim. On the Iliad's shield the river Oceanus encircled the outermost edge."),
    ],
  },
  "spear-of-longinus": {
    title: "Holy Lance",
    owner: "The Roman soldier Longinus",
    maker: "Unknown",
    power: "Legend grew that whoever holds this spear holds the fate of the world.",
    firstRecord: "Gospel of John 19:34",
    summary: "The spear that pierced the side of Christ on the cross. Kings and emperors sought it throughout the Middle Ages.",
    story: `The Gospel of John records that a soldier thrust a spear into the side of Jesus on the cross to confirm that he had died, and that blood and water flowed out. The Bible does not name the soldier. The name Longinus first appears around the fourth century in the apocryphal Gospel of Nicodemus.

In legend Longinus was a soldier with failing sight who regained it, along with faith, when blood running down the spear touched his eyes. From then on the spear itself became a relic.

In 1098, when the First Crusade was besieged at Antioch, the pilgrim Peter Bartholomew followed a vision and dug up a spearhead beneath the cathedral floor. Heartened, the crusaders broke the siege. Today Vienna's Hofburg, the Vatican in Rome and Etchmiadzin in Armenia each still keep a "Holy Lance."`,
    imageAlt: "A Bronze Age copper-alloy spearhead of 1200 to 800 BCE. The long leaf-shaped blade has a central ridge and part of its wooden shaft survives.",
    annotations: [
      n("Spear point", "The sharply tapered point. The Gospel of John says only that a soldier pierced the side with a spear and does not describe its shape."),
      n("Openings in the blade", "The holes on either side of the lower blade are found on Bronze Age spears, both as ornament and to lighten the weapon."),
      n("Socket", "Part of the wooden shaft remains in the socket. Spears kept as relics also mostly survive as bare heads."),
    ],
  },
  "seal-of-solomon": {
    title: "Seal of Solomon",
    owner: "King Solomon",
    maker: "Brought from heaven by the archangel Michael",
    power: "Its seal commands demons and lets the wearer understand beasts and birds.",
    firstRecord: "Testament of Solomon",
    summary: "The signet ring of the wise king, said to have put demons to work building the Temple.",
    story: `According to the apocryphal Testament of Solomon, while the Temple in Jerusalem was being built a demon drained the strength of a young workman every night. When Solomon prayed, the archangel Michael brought him from heaven a ring engraved with a seal.

With the ring in hand Solomon summoned the demons one by one, forced out their names and weaknesses and set them to work on the Temple. The Talmud also tells how the demon king Asmodeus seized the ring, flung Solomon far away and posed as king.

In Islamic tradition the ring lives on as the Seal of Sulayman. Stories of commanding the winds and the jinn and understanding the speech of birds and ants flowed all the way into the Thousand and One Nights. The seal itself was drawn as a five- or six-pointed star.

The photograph shows a gold signet ring from Egypt's Amarna Period in the fourteenth century BCE.`,
    imageAlt: "A fourteenth-century BCE Egyptian gold signet ring. A flat engraved bezel is attached to a thick hoop.",
    annotations: [
      n("Two seal faces", "The bezel is divided into two ovals, or cartouches. Solomon's ring too was said to bind demons with a seal like a name."),
      n("Design in the seal", "The figure cut into the oval prints in reverse like a stamp. Zoom in to see the depth of the incised lines."),
      n("Thick hoop", "The hoop for the finger is thick and heavy. This was a signet for everyday use."),
    ],
  },
  kusanagi: {
    title: "Kusanagi-no-Tsurugi",
    owner: "Susanoo, Yamato Takeru",
    maker: "Found in the tail of Yamata-no-Orochi",
    power: "Cuts the grass by itself and turns back fire.",
    firstRecord: "Kojiki",
    summary: "A sword from the tail of an eight-headed serpent, and one of the three sacred treasures of the Japanese imperial house.",
    story: `Cast out of heaven, the storm god Susanoo came to the land of Izumo and met Yamata-no-Orochi, a great serpent with eight heads and eight tails that devoured a daughter every year. He set out eight vats of strong liquor, got the serpent drunk and hacked it to pieces. When he cut the middle tail his blade struck something and chipped, and inside he found a sword.

Susanoo named it Ame-no-Murakumo-no-Tsurugi, the sword of the gathering clouds of heaven, and presented it to his sister, the sun goddess Amaterasu.

Later, when the hero Yamato Takeru campaigned in the east, enemies set fire to the fields around him. He drew the sword, cut away the grass around him and lit a counter-fire, and the flames turned on his enemies. From then on it was called Kusanagi, the grass-cutting sword. It is said to be enshrined at Atsuta Shrine in Nagoya, but it has never been shown to the public.

The photograph shows straight swords from Japan's Kofun period in the sixth century. Before the Kojiki was written, the swords carried by heroes of myth were straight like these rather than curved.`,
    imageAlt: "Seven straight iron swords from sixth-century Kofun-period Japan laid side by side, with rusted blades, gilt-bronze scabbard fittings and round ring pommels.",
    annotations: [
      n("Round ring pommel", "Swords with large ring pommels come from the tombs of the Kofun-period elite, showing that the sword was a symbol of power."),
      n("Gilt-bronze fittings", "The scabbard and hilt are decorated in gilt bronze. Kusanagi too was revered as one of the three imperial treasures."),
      n("Straight blade", "The rusted blade runs straight. The sword Yamato Takeru used to cut grass and stop the fire would have been a straight sword like this."),
    ],
  },
  "yata-no-kagami": {
    title: "Yata-no-Kagami",
    owner: "Amaterasu, goddess of the sun",
    maker: "Ishikoridome, the mirror-making deity",
    power: "Calls back the sun that hid in a cave.",
    firstRecord: "Kojiki",
    summary: "The bronze mirror that returned light to the world, most revered of the three sacred treasures.",
    story: `Hurt by Susanoo's violence, the sun goddess Amaterasu entered the rock cave Ama-no-Iwato in heaven and shut the door. The world sank into darkness and every sort of calamity arose.

The gods gathered before the cave and made a plan. Ishikoridome made a mirror, Tamanooya strung curved beads and hung them on a tree. The goddess Ame-no-Uzume danced on an upturned tub and the gods roared with laughter.

Curious about the merriment outside, Amaterasu opened the door a crack. The gods held up the mirror and told her a goddess more noble than she had come. At the moment she leaned out, drawn by her own reflected light, a strong god took her hand and pulled her out, and the sun shone on the world again. The mirror is said to have later been enshrined at Ise.

The photograph shows the back of a bronze mirror from Japan's Kofun period in the fourth to fifth century, carved after Han Chinese mirrors with immortals, beasts and the cosmos. Yata-no-Kagami is thought to have resembled mirrors of this era.`,
    imageAlt: "The back of a round Japanese bronze mirror of the fourth to fifth century. Squares, concentric circles, small bosses and animal designs ring a central knob, under a blue-green patina.",
    annotations: [
      n("Central knob", "A round knob for threading a cord. This photo shows the back; the smooth opposite face was polished to reflect faces and light."),
      n("Square and bosses", "The central square and small bosses around it stand for earth and heaven. A mirror was an object holding the cosmos."),
      n("Sawtooth band", "The sawtooth pattern on the outer ring spreads like rays of sunlight, fitting for the mirror that called out the sun goddess Amaterasu."),
    ],
  },
  manpasikjeok: {
    title: "Manpasikjeok",
    owner: "King Sinmun of Silla",
    maker: "Bamboo sent by the dragon of the sea",
    power: "When played, enemy armies retreat, illness is cured, drought brings rain and rough waves grow calm.",
    firstRecord: "Iryeon, Samguk Yusa",
    summary: "The “flute that calms ten thousand waves,” a national treasure that protected Silla.",
    story: `In 682, King Sinmun of Silla received word that a small mountain was floating back and forth in the East Sea toward Gameunsa Temple. On it grew a bamboo that split in two by day and became one by night.

When the king sailed to the mountain a dragon appeared and offered him a black jade belt. The dragon said that bamboo makes sound only when joined, and that King Munmu, now a dragon of the sea, and Kim Yusin, now a god of heaven, had joined their hearts to send this treasure. The king cut the bamboo, made a flute and stored it in the Cheonjon storehouse of Wolseong.

When this flute was played, enemy armies withdrew, illness was cured, rain came in drought and skies cleared in floods, the wind died and the waves grew calm. So it was named Manpasikjeok, the flute that puts ten thousand waves to rest.

The photograph shows a shakuhachi, a nineteenth-century Japanese vertical bamboo flute. The thick root end and nodes recall the bamboo in the story of Manpasikjeok that sounds only when joined.`,
    imageAlt: "A nineteenth-century Japanese shakuhachi, a vertical bamboo flute. The golden, jointed bamboo tube has finger holes and a thick lower end at the root.",
    annotations: [
      n("Mouthpiece", "The top end is cut at a slant so the lips can rest against it. Playing Manpasikjeok was said to calm violent waves."),
      n("Bamboo node", "The natural nodes of the bamboo remain. The dragon had the flute made, saying bamboo sounds only when joined."),
      n("Finger holes", "There are four holes on the front and one on the back. Covering and opening them alone produces five notes."),
      n("Root end", "The lower end is the thick root of the bamboo. King Sinmun kept this flute in the Cheonjon storehouse of Wolseong."),
    ],
  },
  cheonbuin: {
    title: "Cheonbuin",
    owner: "Hwanung",
    maker: "Hwanin, the lord of heaven",
    power: "Proves its bearer has received heaven's mandate, and commands wind, rain and clouds.",
    firstRecord: "Iryeon, Samguk Yusa, “Gojoseon”",
    summary: "Three heavenly tokens Hwanung received when he descended from heaven, commonly understood as a bronze sword, mirror and bell.",
    story: `According to the Gojoseon section of the Samguk Yusa, Hwanung, son of Hwanin the lord of heaven, often set his heart on the human world below. His father, knowing this, looked down on Samwi Taebaek, judged that it could bring wide benefit to humankind, and sent him down with three Cheonbuin.

Hwanung led three thousand followers to the sacred tree on the summit of Taebaek and called the place the City of God. With the wind lord Pungbaek, the rain master Usa and the cloud master Unsa, he took charge of grain and life, sickness and punishment, good and evil.

The record does not say what the Cheonbuin were. But because bronze swords, mirrors and bells are often buried together at Bronze Age sites on the Korean peninsula, the view that these three symbols of heavenly authority were the Cheonbuin is widely accepted.

This image is a composite made by the archive itself. Photographs of an ancient East Asian dagger, a bronze mirror in Han style and a Yayoi-period bronze bell are joined side by side to show "sword, mirror and bell" in one frame.`,
    imageAlt: "A composite of three photographs placed side by side: on the left an ancient East Asian dagger with a gold-decorated hilt, in the center a round bronze mirror with animal relief, on the right a bell-shaped bronze covered in blue-green patina.",
    annotations: [
      n("Sword", "An ancient dagger with a gold-decorated hilt. Among the Cheonbuin, the sword is read as rule by heaven's authority."),
      n("Mirror", "A bronze mirror with animal relief. Mirrors were regarded as sacred objects reflecting the light of heaven, that is, the sun."),
      n("Beasts in the mirror", "Beasts romp around the central knob. The more you zoom, the more the relief of their bodies and legs comes alive."),
      n("Bell", "A bell-shaped bronze. It was a ritual tool for calling the gods and gathering people with sound, and is thought to have led to the shaman's bell."),
    ],
  },
};
