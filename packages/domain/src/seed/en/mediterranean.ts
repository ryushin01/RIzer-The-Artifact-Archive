import type { EnArtifact } from "./types";

const n = (title: string, body: string) => ({ title, body });

/** 그리스 신화, 성서와 성유물, 이집트·중동 전설의 영어 번역 */
export const EN_MEDITERRANEAN: Record<string, EnArtifact> = {
  harpe: {
    title: "Harpe",
    owner: "Cronus, Perseus",
    maker: "Gaia (Cronus's sickle); given to Perseus by Hermes",
    power: "A curved blade that can cut even the immortal.",
    firstRecord: "Hesiod, Theogony",
    summary: "The curved sword of myth. Cronus castrated the sky with it, and Perseus took Medusa's head.",
    story: `In Hesiod's Theogony, the earth goddess Gaia, enraged at the sky god Uranus for imprisoning their children underground, made a great toothed sickle of hard metal. Her youngest, Cronus, cut his father down with it and separated sky from earth.

Later mythographers say Perseus was given a similar curved sword. With the harpe from Hermes, Perseus approached Medusa while watching her reflection in a mirror-bright shield, and took her head in one stroke.

Perseus in Greek vases and sculpture often holds this hooked sword, so that the harpe became the mark by which he is recognized.`,
    imageAlt: "Antonio Canova's marble statue Perseus with the Head of Medusa, 1804–6. The nude Perseus holds a curved sword in his right hand and Medusa's head in his left.",
    annotations: [
      n("Curved sword", "The sword in Perseus's right hand. The harpe lent by Hermes cut off Medusa's head with its sickle-shaped blade."),
      n("Head of Medusa", "Medusa's head in his left hand. Even severed, it turned anyone who looked at it to stone."),
      n("Winged helmet", "Perseus's helmet has small wings. Antonio Canova carved this marble statue in 1804–6."),
    ],
  },
  "poseidon-trident": {
    title: "Trident of Poseidon",
    owner: "Poseidon, god of the sea",
    maker: "The one-eyed Cyclopes",
    power: "When struck, the sea boils, the earth shakes and springs rise.",
    firstRecord: "Homer, Iliad",
    summary: "The trident of Poseidon, god of sea and earthquakes.",
    story: `In thanks for help in the war against the Titans, the one-eyed Cyclopes made weapons for three divine brothers. Zeus received the thunderbolt, Hades the helmet and Poseidon the trident.

In the Iliad Poseidon uses this trident to tear down and sweep away the Greek wall on the shore of Troy. As his epithet Earthshaker suggests, when he struck rock with it the ground shook and springs rose.

Competing with Athena to be patron of Athens, Poseidon struck the rock of the Acropolis with his trident and raised a saltwater spring. But the people chose the olive tree Athena offered.`,
    imageAlt: "The reverse of a silver coin of King Demetrius of Macedon, about 300–295 BCE. A nude Poseidon with a cloak over his left arm strides forward aiming his trident, with Greek letters around him.",
    annotations: [
      n("Trident", "The trident held in his right hand points to the left. The one-eyed Cyclopes made this spear for Poseidon."),
      n("Striding god", "With a cloak over his left arm, Poseidon advances aiming his spear. When he struck the ground with his trident, earthquakes shook and springs rose."),
      n("King's name", "Greek letters around the edge read 'of King Demetrius.' A king who ruled the seas put Poseidon on his coins."),
    ],
  },
  "zeus-thunderbolt": {
    title: "Thunderbolt of Zeus",
    owner: "Zeus",
    maker: "The one-eyed Cyclopes",
    power: "Lightning that splits the sky. It felled the Titans and the monster Typhon.",
    firstRecord: "Hesiod, Theogony",
    summary: "The lightning of Zeus, king of the gods, and the very emblem of his power.",
    story: `In the Theogony Zeus frees the Cyclopes whom his father Cronus had imprisoned, and in gratitude they make him thunder and lightning. Holding this lightning, Zeus ended the ten-year war against the Titans.

When Typhon, the most terrible of monsters, attacked the gods, Zeus hurled bolt after bolt, burned Typhon and cast him into Tartarus.

Zeus in Greek sculpture grasps lightning shaped like a rod pointed at both ends. For thousands of years afterward that form was how people drew the bolt of a god.`,
    imageAlt: "A Greek bronze statuette of the early fifth century BCE. A bearded god, Zeus or Poseidon, spreads his arms as if about to throw something. The lower legs are lost and it stands on a rod.",
    annotations: [
      n("Bearded face", "A heavy beard and banded hair. It is not certain whether this statuette shows Zeus or Poseidon."),
      n("Raised arm", "One arm extends and the other is drawn back. If Zeus, the hand holds a thunderbolt; if Poseidon, a trident, ready to throw."),
      n("Missing legs", "The lower legs are lost, and a rod sets the figure on its base. This is a Greek bronze of the early fifth century BCE."),
    ],
  },
  "helm-of-darkness": {
    title: "Helm of Hades",
    owner: "Hades, god of the underworld",
    maker: "The one-eyed Cyclopes",
    power: "Its wearer cannot be seen even by the gods.",
    firstRecord: "Homer, Iliad",
    summary: "The helmet of Hades, god of the underworld, which makes its wearer invisible.",
    story: `The helmet the Cyclopes made for Hades made its wearer visible to no one. In Book 5 of the Iliad Athena puts it on and enters battle, so that even Ares, god of war, cannot recognize her.

Perseus too borrowed this helmet from the nymphs when he went after Medusa. After beheading her he escaped the pursuing Gorgon sisters thanks to the helmet.

The Greek word kynee originally meant a cap of dogskin, a fitting name for the helmet of Hades, master of the hound Cerberus.`,
    imageAlt: "A Greek bronze helmet of Corinthian type, about 650–600 BCE. Only eye openings are cut, and guards for nose and cheeks extend downward.",
    annotations: [
      n("Rounded bowl", "A rounded bronze plate encloses the whole head. The helmet of Hades was made by the Cyclopes, and its wearer could be seen by no one."),
      n("Eye opening", "A narrow opening shows only the eyes. A Corinthian helmet hid almost the whole face, so its wearer could not be recognized."),
      n("Holes along the edge", "Small holes line the edge, where a leather or cloth lining was stitched inside."),
    ],
  },
  "nemean-lion": {
    title: "Skin of the Nemean Lion",
    owner: "Heracles",
    maker: "Flayed by Heracles with the lion's own claws",
    power: "No sword or arrow can pierce it.",
    firstRecord: "Hesiod, Theogony",
    summary: "The lion skin won in the first labor of Heracles, which became his emblem.",
    story: `In the valley of Nemea lived a lion no weapon could wound. Sent to kill it as the first of his twelve labors, Heracles saw his arrows and sword bounce off, and so strangled the lion with his bare hands.

Skinning it remained. Since no blade would cut, Heracles slit the hide with the lion's own sharp claws.

After that he wore the lion's head as a helmet and the skin as a cloak. In Greek and Roman art a man in a lion skin is Heracles.`,
    imageAlt: "A Cypriot limestone head of the early fifth century BCE. Heracles wears a lion skin over his head, framing his face.",
    annotations: [
      n("Lion-skin hood", "Heracles wore the lion's skin over his head. No weapon could pierce the hide of the Nemean lion."),
      n("Face", "The face of Heracles shows beneath the skin. He strangled with bare hands the lion that arrows and clubs could not harm."),
      n("Fall of the mane", "The lion's mane and forepaws hang at both sides. Heracles flayed the skin with the lion's own claws."),
    ],
  },
  "golden-apples": {
    title: "Golden Apples of the Hesperides",
    owner: "Hera; guarded by the Hesperides",
    maker: "Gaia gave them as a wedding gift",
    power: "The fruit of the gods, said to give immortality.",
    firstRecord: "Hesiod, Theogony",
    summary: "Golden apples guarded by a dragon in a garden at the western edge of the world. They were the eleventh labor of Heracles.",
    story: `To celebrate the marriage of Zeus and Hera, Gaia gave them a tree bearing golden apples. Hera planted it in a garden at the western end of the world and set the evening nymphs, the Hesperides, and the sleepless dragon Ladon to guard it.

Heracles had to bring back these apples as his eleventh labor. He asked the giant Atlas, who held up the sky, to pick them for him, and carried the sky on his own shoulders meanwhile.

A golden apple also sowed the seed of the Trojan War. When Eris, goddess of discord, tossed one inscribed "to the fairest," the quarrel of three goddesses began.`,
    imageAlt: "An Attic red-figure water jar (hydria) of the early fourth century BCE. Against the black ground, figures in red stand around a tree wound with a white snake.",
    annotations: [
      n("Tree with the snake", "A white snake winds around the tree: the dragon Ladon, who guarded the golden apples in the garden of the Hesperides."),
      n("Figures around it", "Figures stand around the tree. As his eleventh labor, Heracles had to bring back the golden apples from this garden."),
      n("Neck and mouth", "A narrow neck and wide mouth. A jar for drawing water (hydria), made in Athens in the early fourth century BCE."),
    ],
  },
  ambrosia: {
    title: "Ambrosia and Nectar",
    owner: "The gods of Olympus",
    maker: "Carried by doves",
    power: "Keeps the gods ageless and deathless.",
    firstRecord: "Homer, Iliad",
    summary: "Ambrosia, food of the gods, and nectar, their drink. The very name means “not dying.”",
    story: `In Homer's epics the gods eat ambrosia and drink nectar rather than human bread and wine. The word ambrosia means "not dying," and ichor flows in the gods' veins instead of blood.

The Odyssey sings that doves bring ambrosia to Zeus from the ends of the earth. The gods also rub it on like perfumed oil; Hera washes and adorns herself with it.

Mortals who tried to steal it suffered greatly. Tantalus, for stealing the food of the gods and sharing it with people, was condemned to eternal hunger and thirst.`,
    imageAlt: "A Cypriot footed cup (kylix) of about 750–600 BCE, with scrolls and geometric designs in red and black on a pale ground.",
    annotations: [
      n("Cup mouth", "A wide, round mouth. At their feasts on Olympus the gods drank nectar and ate ambrosia."),
      n("Red scrollwork", "Scrolls and geometric patterns are painted in red and black on this Cypriot cup of the eighth or seventh century BCE."),
      n("High foot", "A slender foot holds up the cup. Tantalus stole the food of the gods, shared it with people and received everlasting punishment."),
    ],
  },
  "necklace-of-harmonia": {
    title: "Necklace of Harmonia",
    owner: "Harmonia and the royal house of Thebes",
    maker: "Hephaestus, god of the forge",
    power: "Keeps its wearer young and beautiful forever but brings misfortune for generations.",
    firstRecord: "Statius, Thebaid",
    summary: "A wedding gift forged with a curse by Hephaestus, enraged at his wife's infidelity.",
    story: `Harmonia was the daughter of Aphrodite and the war god Ares. Enraged at his wife's infidelity, Hephaestus gave Harmonia a beautiful necklace when she married Cadmus, founder of Thebes, and secretly put a curse in it.

The necklace kept women young and beautiful, but endless misery followed the Theban house that owned it. The tragedy of Oedipus unfolded in this family.

Later Polynices bribed Eriphyle, wife of a seer, with this necklace to send her husband to a war she knew would kill him. In the end the necklace is said to have left human hands only when dedicated at the temple at Delphi.`,
    imageAlt: "A Greek gold necklace of the fourth century BCE, with small spearhead-shaped gold ornaments packed closely along its length.",
    annotations: [
      n("Clasp ends", "The two ends that fasten behind the neck. Hating Harmonia, the daughter of Aphrodite and Ares, Hephaestus put a curse in this necklace."),
      n("Spear-shaped ornaments", "Tiny gold ornaments crowd the strand. Harmonia's necklace kept its wearer young and beautiful, but also brought misfortune."),
      n("Lower part", "The necklace brought tragedy down the generations of the Theban royal house. The photograph shows a Greek gold necklace of the fourth century BCE."),
    ],
  },
  "eros-arrows": {
    title: "Arrows of Eros",
    owner: "Eros (Cupid), god of love",
    maker: "Unknown",
    power: "A gold arrow makes one fall in love, a lead arrow makes one flee from it.",
    firstRecord: "Ovid, Metamorphoses",
    summary: "The golden arrow that kindles love and the lead arrow that drives it away.",
    story: `In Ovid's Metamorphoses, Apollo, having shot the serpent Python, mocks young Eros's skill with the bow. Angered, Eros takes out two arrows: a sharp gold one that kindles love and a blunt lead one that puts it to flight.

He shoots Apollo with the gold arrow and the nymph Daphne with the lead. Apollo falls in love with Daphne, but she flees him and, praying to her river-god father, turns into a laurel tree.

Apollo wove a crown of laurel leaves to wear, and the laurel wreath became a symbol of victory and honor.`,
    imageAlt: "A Roman bronze statuette of the first to second century CE. A winged boy, Eros, strides forward holding what appears to be a long bow in his left hand with his right arm raised high.",
    annotations: [
      n("Bow", "He holds what appears to be a bow in his left hand. A gold arrow from Eros kindles love, and a lead arrow drives love away."),
      n("Wings", "Small wings sprout from his back. This is a Roman bronze Eros of the first or second century."),
      n("Outstretched arm", "His right arm reaches high. Eros shot Apollo with a gold arrow and Daphne with a lead one."),
    ],
  },
  pegasus: {
    title: "Pegasus",
    owner: "Bellerophon, later Zeus",
    maker: "Born from Medusa's neck",
    power: "Flies on its wings, and raises springs by striking the ground with its hooves.",
    firstRecord: "Hesiod, Theogony",
    summary: "The winged horse that sprang up when Perseus beheaded Medusa.",
    story: `The Theogony sings that when Perseus cut off Medusa's head, the winged horse Pegasus sprang from her body. When Pegasus kicked Mount Helicon with his hoof, the poets' spring Hippocrene gushed forth.

The hero Bellerophon tamed Pegasus with a golden bridle Athena gave him in a dream. Riding Pegasus through the sky, he shot down the fire-breathing monster Chimera.

When Bellerophon grew proud and tried to ride Pegasus up to Olympus, Zeus sent a gadfly to sting the horse. Bellerophon fell to earth, and Pegasus rose to heaven to carry the thunderbolts of Zeus.`,
    imageAlt: "A bronze statuette of Pegasus from the late sixteenth century. A horse with spread wings rears on its hind legs on a marble base.",
    annotations: [
      n("Wings", "Wings rising from the back. Pegasus was born from Medusa's blood when Perseus cut off her head."),
      n("Raised forelegs", "He rears up on his hind legs. When Pegasus kicked Mount Helicon with his hoof, the poets' spring Hippocrene gushed out."),
      n("Marble base", "The bronze dates from the late sixteenth century, and the marble base was added later."),
    ],
  },
  argo: {
    title: "The Argo",
    owner: "Jason and the Argonauts",
    maker: "The shipwright Argus, helped by Athena",
    power: "Its prow, made of the sacred oak of Dodona, speaks like a person and tells the future.",
    firstRecord: "Homer, Odyssey",
    summary: "The ship that carried fifty heroes in search of the Golden Fleece, called “the Argo known to all.”",
    story: `The Odyssey says the only ship to pass safely between the clashing rocks was "the Argo known to all." The story of the Argo was already widely known in Homer's day.

The shipwright Argus built the vessel with Athena's help. Athena set in the prow a piece of the sacred oak of Dodona, where Zeus gave oracles, and the wood foretold the future in a human voice.

Jason sailed for Colchis with fifty heroes, including Heracles, Orpheus and the twins Castor and Polydeuces. When the voyage ended the ship was dedicated to the sea god Poseidon and is said to have become a constellation.`,
    imageAlt: "A wooden boat model from Middle Kingdom Egypt, about 1981–1975 BCE. Figures of rowers are packed on a green boat, their oars lowered into the water.",
    annotations: [
      n("Rowers", "Figures gripping oars sit close together. The Argo carried fifty heroes, among them Jason, Heracles and Orpheus."),
      n("Rows of oars", "Oars descend side by side toward the water. In the Argo's prow was a piece of the talking oak of Dodona."),
      n("Steering oar", "A large oar at the stern sets the course. This boat model came from a Middle Kingdom Egyptian tomb of the twentieth century BCE."),
    ],
  },
  "cestus-of-aphrodite": {
    title: "Girdle of Aphrodite",
    owner: "Aphrodite, goddess of love",
    maker: "Unknown",
    power: "Embroidered with love, longing and beguiling words, it makes anyone fall in love.",
    firstRecord: "Homer, Iliad, Book 14",
    summary: "The embroidered band of Aphrodite that Hera borrowed to lull Zeus to sleep.",
    story: `In Book 14 of the Iliad, Hera schemes to distract Zeus, who favors the Trojans. She goes to Aphrodite, pretending she wishes to reconcile an estranged old couple, and borrows her embroidered band.

Homer sings that this band was stitched with love, longing and sweet words that steal even a wise man's mind.

Seeing Hera wearing it, Zeus was stirred as when he first fell in love. While he slept with the help of the god of Sleep, Poseidon aided the Greeks and turned the tide of battle.`,
    imageAlt: "A Roman marble statue of Aphrodite of the first to second century CE. The nude goddess, with hair tied up, stands with both arms broken away.",
    annotations: [
      n("Face", "The goddess's face with her hair tied up. This is a Roman statue of Aphrodite of the first or second century."),
      n("Waist", "On Aphrodite's girdle were embroidered love, desire and beguiling words. Hera borrowed it to enchant Zeus."),
      n("Dolphin at her feet", "A small figure is attached at her feet. Dolphins are often carved beside Aphrodite, who was born from the sea foam."),
    ],
  },
  "ring-of-gyges": {
    title: "Ring of Gyges",
    owner: "The shepherd Gyges",
    maker: "Unknown",
    power: "Turning the bezel inward makes its wearer invisible.",
    firstRecord: "Plato, Republic",
    summary: "A ring of invisibility. Plato used it to ask whether one would be just if no one were watching.",
    story: `In Plato's Republic, Glaucon tells the story of Gyges, a shepherd of Lydia. In a chasm opened by an earthquake, Gyges found the corpse of a giant lying in a bronze horse and took a gold ring from its finger.

Gyges discovered that when he turned the bezel of the ring toward his palm, he became invisible. With this power he entered the palace, seduced the queen, killed the king and became ruler of Lydia.

Glaucon asks: would not even a just man commit injustice if he owned such a ring? In reply Socrates argues for the value of justice itself.`,
    imageAlt: "An Etruscan gold ring of the late fourth or early third century BCE. Letters are punched in dots across the front of the wide gold band.",
    annotations: [
      n("Letters in dots", "Letters are punched into the band with dots. This is an Etruscan gold ring of the fourth to third century BCE."),
      n("Ring bezel", "A broad bezel. The shepherd Gyges found that turning the bezel toward his palm made him vanish."),
      n("Inside the ring", "The inside of the thick gold band. In the Republic, Plato borrows this ring to ask whether one would be just if no one were watching."),
    ],
  },
  ascalon: {
    title: "Ascalon",
    owner: "Saint George",
    maker: "A one-eyed smith (in Richard Johnson's tale)",
    power: "The dragon-slaying sword that cuts through any armor.",
    firstRecord: "Richard Johnson, The Seven Champions of Christendom",
    summary: "The sword of Saint George, who overcame the dragon. It is named after the Holy Land city of Ascalon.",
    story: `Saint George was a Roman soldier martyred early in the fourth century, who came to be portrayed in the Middle Ages as a dragon-slaying knight. The thirteenth-century Golden Legend tells how he overcame with a lance a dragon demanding maidens as sacrifice in a city of Libya.

In 1596 Richard Johnson's Seven Champions of Christendom gave his sword the name Ascalon, after a city of the Holy Land at the eastern end of the Mediterranean.

Saint George, who became England's patron saint, was painted countless times spearing the dragon, with his flag of a red cross on white.`,
    imageAlt: "A French walnut carving of Saint George and the Dragon from the early sixteenth century. A mounted knight drives down a lance while a dragon writhes beneath the horse's hooves.",
    annotations: [
      n("Lance", "The knight drives his lance downward. In 1596 Richard Johnson's tale gave Saint George's sword the name Ascalon."),
      n("Dragon underfoot", "A dragon twists beneath the horse's hooves. In The Golden Legend, George overcame a dragon tormenting a city in Libya and saved a princess."),
      n("Knight's face", "A young knight in a cap, carved from walnut in early sixteenth-century France."),
    ],
  },
  "noahs-ark": {
    title: "Noah's Ark",
    owner: "Noah and his family",
    maker: "Built by Noah at God's command",
    power: "Kept people and animals safe from the flood that covered the world.",
    firstRecord: "Book of Genesis",
    summary: "The great vessel that saved Noah's family and the animals from the flood.",
    story: `In Genesis, God sees the world filled with evil and resolves to wash it away with a flood. But he tells Noah, a righteous man, to build an ark of gopher wood three hundred cubits long, fifty wide and thirty high.

Noah took his family aboard with every kind of animal, male and female. Rain fell for forty days until the water covered the mountaintops, and when it drained away the ark came to rest on Mount Ararat.

When a dove Noah sent out came back with an olive leaf, he knew the land was dry. The rainbow that rose after the flood became a sign of the promise never again to destroy the world by water. The Mesopotamian Epic of Gilgamesh tells a similar story of flood and ship.`,
    imageAlt: "A sixteenth-century engraving, Noah Leaving the Ark. In front of the huge ark, Noah's family and many animals step down to the ground.",
    annotations: [
      n("Ark", "A huge ark lies at an angle behind. God told Noah to build an ark three hundred cubits long."),
      n("Noah and his family", "The bearded old man with the staff is Noah. When the flood ended, his family came down from the ark."),
      n("Animals coming ashore", "Lions, goats, porcupines, deer and other animals taken aboard in pairs step onto the land."),
    ],
  },
  "sword-of-peter": {
    title: "Sword of Saint Peter",
    owner: "The apostle Peter",
    maker: "Unknown",
    power: "Swung to defend his master, and rebuked with “Put your sword into its sheath.”",
    firstRecord: "Gospel of John 18:10",
    summary: "The sword with which Peter cut off the ear of the high priest's servant Malchus on the night Jesus was arrested.",
    story: `On the night Jesus was arrested in the garden of Gethsemane, his disciple Peter drew a sword and cut off the right ear of Malchus, the high priest's servant. The Gospel of John names both the man who struck and the man who was struck.

Jesus rebuked Peter, saying, "Put your sword into its sheath." The Gospel of Luke adds that Jesus touched the servant's ear and healed him.

The cathedral museum in Poznań, Poland, keeps a sword said to be Peter's. In medieval art Peter is shown with the keys of heaven and sometimes also with this sword.`,
    imageAlt: "A falchion from Venice, about 1490. A hooked hand guard and round pommel sit above a broad single-edged blade.",
    annotations: [
      n("Pommel", "A round pommel with decorative projections."),
      n("Curved hand guard", "The guard curves like a hook around the hand. Poznań Cathedral in Poland holds a falchion said to be the sword of Peter."),
      n("Single-edged blade", "A wide single-edged blade. In Gethsemane Peter cut off the ear of Malchus, servant of the high priest, and Jesus told him to put away his sword."),
    ],
  },
  zulfiqar: {
    title: "Dhu al-Fiqar",
    owner: "The Prophet Muhammad, later Ali",
    maker: "Unknown",
    power: "A blade forked at the tip. “No youth like Ali, no sword like Dhu al-Fiqar.”",
    firstRecord: "Ibn Ishaq, Life of the Prophet",
    summary: "The sword of Ali, fourth caliph of Islam, depicted with a forked tip.",
    story: `Dhu al-Fiqar is said to have been a sword the Prophet Muhammad obtained after the battle of Badr, which passed at the battle of Uhud to Ali, his cousin and son-in-law. The name is interpreted as "having vertebrae."

Tradition relates that when Ali fought bravely with this sword at Uhud, a voice was heard from heaven: "There is no youth like Ali, no sword like Dhu al-Fiqar."

It is usually drawn as a sword forked in two at the tip. In Shi'a Islam especially it became an emblem of Ali and justice, used on banners, amulets and even the flags of Ottoman armies.`,
    imageAlt: "A Turkish kilij. A nineteenth-century gold guard and curved grip of nephrite are mounted on a blade inlaid with gold designs and letters.",
    annotations: [
      n("Nephrite grip", "A curved grip carved from deep green nephrite. The nephrite handle is from India, and the hilt mounts and guard from Turkey."),
      n("Gold guard", "A gold guard with ends curled like animal heads, set with rubies."),
      n("Gold-inlaid letters", "Letters and patterns in gold are set into the blade. In Islamic tradition, Dhu al-Fiqar is drawn with a forked tip and praised as the sword of Ali."),
    ],
  },
  "flying-carpet": {
    title: "Flying Carpet",
    owner: "Prince Husain",
    maker: "Unknown",
    power: "Sit on it, think of a place, and it takes you there in an instant.",
    firstRecord: "Galland, French Thousand and One Nights",
    summary: "The magic carpet in the Thousand and One Nights tale of Prince Ahmed and the Fairy Peri Banu.",
    story: `An Indian sultan had three sons, all of whom wished to marry their cousin. The sultan declared he would give her to whichever son brought back the most marvelous thing after a year of traveling the world.

The eldest, Husain, bought in the market of Bisnagar a carpet that carried whoever sat on it to any place they imagined in an instant. The second obtained an ivory spyglass showing faraway things, and the youngest, Ahmed, an apple that cured any disease.

Seeing through the glass that their cousin was dying, the brothers flew home on the carpet and saved her with the apple. Antoine Galland heard this story from the Syrian Hanna Diyab early in the eighteenth century and put it in his French Thousand and One Nights.`,
    imageAlt: "The Seley Carpet from late sixteenth-century Iran, a long carpet with a round medallion at the center of a red ground, surrounded by flowers and vines.",
    annotations: [
      n("Central medallion", "Patterns spread from the round central medallion. Prince Husain of the Thousand and One Nights bought a carpet in the market of Bisnagar that flew wherever one wished."),
      n("Corner ornament", "A quarter of the medallion sits in each of the four corners. This is a silk and wool carpet of late sixteenth-century Iran."),
      n("Border", "Several layers of border enclose the field. Carpets like this covered palace floors or hung on walls."),
    ],
  },
  "ring-of-the-jinn": {
    title: "Ring of the Jinn",
    owner: "Aladdin",
    maker: "Unknown",
    power: "Rub it and the jinni of the ring appears to grant your wishes.",
    firstRecord: "Galland, French Thousand and One Nights",
    summary: "The genie of the ring, who rescued Aladdin before the magic lamp did.",
    story: `In Aladdin and the Magic Lamp, the wicked sorcerer sends Aladdin into a cave to fetch a lamp and puts a ring on him for protection. When Aladdin will not hand over the lamp first, the sorcerer seals the cave entrance.

Wringing his hands in the dark, Aladdin rubs the ring, and the jinni of the ring appears and asks what he desires. Thanks to this jinni, Aladdin gets out of the cave and returns home.

Weaker than the jinni of the lamp, the jinni of the ring still carried Aladdin to the princess when the sorcerer later stole away the whole palace. This story too was told to Galland by Hanna Diyab and added to the Thousand and One Nights.`,
    imageAlt: "A gold ring from Iraq of the twelfth to thirteenth century. The hexagonal bezel is pierced with vines and script-like patterns, and animal-shaped ornaments sit on its shoulders.",
    annotations: [
      n("Pierced bezel", "The hexagonal bezel is cut through with vines and knots. In the Thousand and One Nights, Aladdin summons a genie by rubbing a ring in the cave."),
      n("Animal shoulders", "Ornaments in animal form sit where bezel meets hoop."),
      n("Round bosses", "A small gold boss marks each corner. This is a gold ring made in Iraq in the twelfth or thirteenth century."),
    ],
  },
  "book-of-the-dead": {
    title: "Book of the Dead",
    owner: "The dead of ancient Egypt",
    maker: "Priests and scribes",
    power: "Reciting its spells carries one past the dangers of the underworld to the paradise of Osiris.",
    firstRecord: "Funerary texts of the New Kingdom",
    summary: "A guide to the afterlife buried with the dead. Its true title is “Spells for Going Forth by Day.”",
    story: `The ancient Egyptians believed a long journey continued after death. From the New Kingdom on they wrote on papyrus the spells needed to get past the gatekeepers and monsters of the underworld and buried them with the mummy. We call this writing the Book of the Dead, but its original name was "Spells for Going Forth by Day."

Its most famous scene is the weighing of the heart. The dead person's heart was placed on a scale against the feather of Maat, goddess of truth. If it was heavy the monster Ammit devoured it; if light, the dead could enter the paradise of Osiris.

The Book of the Dead was not one book but a selection from nearly two hundred spells. The wealthy commissioned copies with their own names and illustrations.`,
    imageAlt: "An Egyptian Book of the Dead papyrus of 664–30 BCE. Columns of hieroglyphs run across the yellowed sheet, with drawings of boats carrying gods.",
    annotations: [
      n("Boat of the gods", "At the top is a boat with gods in a line. The Book of the Dead is a collection of spells buried with the dead to carry them safely through the underworld."),
      n("Djed pillar and god", "A tiered djed pillar and a god stand at the far left. The djed is the backbone of Osiris and means steadfastness."),
      n("Columns of hieroglyphs", "On the right the spells run in vertical columns of hieroglyphs. This scroll contains Chapters 100 and 129."),
    ],
  },
  "emerald-tablet": {
    title: "Emerald Tablet",
    owner: "Hermes Trismegistus",
    maker: "Hermes Trismegistus (by tradition)",
    power: "Holds the secret of all things and the foundation of alchemy in fourteen lines: “As above, so below.”",
    firstRecord: "Arabic Book of the Secret of Creation",
    summary: "The scripture of alchemy, said to be inscribed by “thrice-great Hermes” on a tablet of emerald.",
    story: `Hermes Trismegistus, "thrice-great Hermes," is a legendary sage in whom the Greek god Hermes and the Egyptian god of wisdom Thoth are merged. Many esoteric writings in his name were composed in Hellenistic Egypt.

The Emerald Tablet is a short text he is said to have engraved on a green stone. The Arabic Book of the Secret of Creation, of the eighth or ninth century, relates that a sage found the tablet in an underground chamber in Tyana, held by an old man seated beneath a statue of Hermes. It opens: "That which is above is like that which is below, and that which is below is like that which is above."

After its translation into Latin in the twelfth century, the text became a scripture for European alchemists. Isaac Newton himself wrote out a translation in English. There is no credible record of anyone having seen the tablet itself.`,
    imageAlt: "An Egyptian steatite magical stela (cippus of Horus) of about 300 BCE from the Ptolemaic period. The young Horus standing on crocodiles is carved in relief in the upper part of the dark slab, and spells are densely inscribed below.",
    annotations: [
      n("Young Horus at the center", "The boy Horus stands facing forward in the upper slab, grasping snakes and scorpions. Hermes Trismegistus is a figure merged with the Egyptian god of wisdom Thoth."),
      n("Feet on crocodiles", "Horus stands on two crocodiles. Stelae like this are inscribed with magic spells to ward off poison and dangerous beasts."),
      n("Inscribed spells", "Hieroglyphic spells crowd the lower part. The Emerald Tablet too survives as fourteen lines said to be engraved on stone, beginning 'As above, so below.'"),
    ],
  },
  "solar-barque": {
    title: "Solar Barque of Ra",
    owner: "Ra, god of the sun",
    maker: "Unknown",
    power: "Crossing the sky by day and the underworld by night, it makes the sun rise again.",
    firstRecord: "Pyramid Texts",
    summary: "The two ships in which the sun god Ra travels by day and by night.",
    story: `The ancient Egyptians believed the sun crossed the sky in a boat. In the morning the sun god Ra rose in the east in a boat called Mandjet, and in the evening he changed to Mesektet and entered the underworld beyond the western horizon.

In the night world the giant serpent Apep lay waiting to swallow the sun. The gods aboard, Set above all, had to fight off Apep so that the sun could rise again the next morning.

Pharaohs hoped after death to board this boat and travel the sky with Ra. The ship 43 meters long found beside the pyramid of Khufu is regarded as evidence of this belief.`,
    imageAlt: "A wooden boat model from Middle Kingdom Egypt. On a green boat with a raised sail stand figures of a rower, a seated person and a steersman.",
    annotations: [
      n("Sail", "A sail raised high. The sun god Ra crosses the sky by day in the 'Boat of Millions of Years' and passes through the underworld by night in another."),
      n("Seated figure", "The figure seated in white is the owner of this boat. The model was placed in the tomb so the dead could travel by boat in the afterlife."),
      n("Steering oar", "A long oar at the stern sets the course. Each night the serpent Apep of the underworld tried to swallow the sun's boat."),
    ],
  },
  rakhsh: {
    title: "Rakhsh",
    owner: "The hero Rustam",
    maker: "Unknown",
    power: "Fights lions to protect its master, strong as an elephant and swift as the wind.",
    firstRecord: "Ferdowsi, Shahnameh",
    summary: "The horse of Rustam, greatest hero of Persia, spotted red as if strewn with rose petals.",
    story: `In the Persian epic the Shahnameh (Book of Kings), young Rustam tested many horses to find one that could carry him. Horses sank to the ground when he merely pressed on them, but one colt, spotted red like rose petals, did not budge. That horse was Rakhsh.

On the first night of the Seven Trials undertaken by Rustam to rescue the king, Rakhsh alone killed a lion that was stalking his sleeping master. In the third trial, when a dragon drew near, the horse kept waking Rustam to warn him.

Rakhsh fought beside Rustam all his life and, at the end, fell with him into a pit dug by a traitor, and they died together.`,
    imageAlt: "A page from a Shahnameh manuscript painted in India around 1450, Rustam Lassos Rakhsh. Between Persian text above and below, a herd of horses runs on a meadow among people holding lassos.",
    annotations: [
      n("Herd of horses", "A herd running on the meadow. The hero Rustam sought a strong young horse fit to carry him among many others."),
      n("Man with a lasso", "Rustam throwing a lasso. Caught in that noose, Rakhsh became his lifelong companion."),
      n("Persian verse", "Verses from Ferdowsi's Shahnameh are written above and below. This page comes from a manuscript painted in India around 1450."),
    ],
  },
  bucephalus: {
    title: "Bucephalus",
    owner: "Alexander the Great",
    maker: "Unknown",
    power: "A wild horse no one could tame, afraid of its own shadow.",
    firstRecord: "Plutarch, Life of Alexander",
    summary: "The horse tamed by the boy Alexander, who rode it from Persia to India.",
    story: `According to Plutarch, a huge black horse brought for sale before Philip of Macedon would let no one ride it. Alexander, about twelve years old, noticed that it was startled by its own shadow, turned its head toward the sun, mounted and tamed it.

Philip is said to have told his son, "Macedon is too small for you; seek a kingdom that fits you." The name Bucephalus means "ox head."

Bucephalus carried Alexander through Persia as far as India. When the horse died of age by the river Hydaspes in 326 BCE, Alexander founded a city there and named it Bucephala.`,
    imageAlt: "A silver tetradrachm of Alexander the Great from the Seleucid dynasty, about 325–319 BCE, bearing a profile wearing a lion skin in the guise of Heracles.",
    annotations: [
      n("Lion-skin helmet", "He wears a lion skin on his head, the costume of Heracles. Alexander the Great is thought to be shown here as Heracles."),
      n("Profile", "A straight nose and deep-set eye. Alexander noticed that Bucephalus, whom no one could tame, was startled by its own shadow, and mounted it facing the sun."),
      n("Edge of the coin", "The thick rim of the silver coin, a tetradrachm struck by the Seleucid dynasty late in the fourth century BCE."),
    ],
  },
};

/** 100점을 채우며 더한 유물의 영어 번역 */
export const EN_MORE: Record<string, EnArtifact> = {
  "pandoras-box": {
    title: "Pandora's Box",
    owner: "Pandora, the first woman",
    maker: "Zeus (all the gods shaped Pandora together)",
    power: "Opened, it scatters every evil into the world, leaving only hope within.",
    firstRecord: "Hesiod, Works and Days",
    summary: "The vessel opened by Pandora. It was originally a large jar, and became a “box” in the sixteenth century.",
    story: `When Prometheus stole the fire of the gods and gave it to humankind, Zeus decided to punish them with evil in return. Hephaestus shaped a woman from earth, and each of the gods gave her a gift, so that she became Pandora, "she who received all gifts."

In Hesiod's Works and Days, Pandora opens the lid of a great jar (pithos). Sickness and suffering scatter across the world, and only hope remains beneath the jar's rim. Before that, it is said, people knew neither disease nor hard labor.

The jar became a "box" only when Erasmus retold the story in Latin in the sixteenth century, using pyxis, a word for a small casket. Since then "Pandora's box" has meant a source of trouble best left alone.`,
    imageAlt: "A lidded pottery container (pyxis) from Apulia in southern Italy, about 300 BCE. The round body has red spirals on a black ground and is topped by a knobbed lid.",
    annotations: [
      n("Knobbed lid", "A lid with a knob covers the body. A small lidded container like this is called a pyxis, and when Erasmus used the word for Pandora's jar it became a 'box.'"),
      n("Spiral-painted body", "Red spirals and floral motifs are painted on a black ground. Hesiod's Pandora opens a great jar and scatters sickness and suffering."),
      n("Foot", "A low, wide foot. This pottery was fired in Apulia in southern Italy about 300 BCE. Only hope remained in the jar."),
    ],
  },
  caduceus: {
    title: "Caduceus",
    owner: "Hermes, messenger of the gods",
    maker: "Apollo (by tradition)",
    power: "Reconciles enemies, puts people to sleep or wakes them, and leads the souls of the dead to the underworld.",
    firstRecord: "Homeric Hymn to Hermes",
    summary: "Hermes's staff wound with two serpents, a symbol of heralds and peace.",
    story: `According to the Homeric Hymn to Hermes, the newborn Hermes stole Apollo's cattle and was found out. He made peace by giving Apollo a lyre made from a tortoise shell, and Apollo gave him a golden staff in return.

Later stories tell that when Hermes held his staff between two fighting snakes, they stopped and wound around it. So the winged staff with two serpents became the emblem of heralds, truce and trade.

Hermes put people to sleep or awoke them with this staff, and led the souls of the dead to the underworld. Today it is sometimes mistakenly used as a symbol of medicine; the true symbol is the staff of Asclepius, wound with a single serpent.`,
    imageAlt: "A Greek or Roman bronze statuette of Hermes from around the first century. A young Hermes stands with a cloak over his shoulder; the staff he once held does not survive.",
    annotations: [
      n("Young face", "A young god with short curly hair. Hermes was clever enough to steal Apollo's cattle on the day he was born."),
      n("Cloak on the shoulder", "A traveler's short cloak (chlamys) over the shoulder. Hermes is the messenger of the gods and protector of those on the road."),
      n("Winged sandals", "Small wings are visible at the ankles. The caduceus he once held does not survive. With this staff Hermes reconciled two fighting serpents."),
    ],
  },
  "rod-of-asclepius": {
    title: "Rod of Asclepius",
    owner: "Asclepius, god of medicine",
    maker: "Unknown",
    power: "A staff wound with a serpent, symbolizing healing skill that could revive even the dead.",
    firstRecord: "Pindar, Pythian Ode 3",
    summary: "The staff of the god of medicine, wound with a single serpent and still a symbol of medicine today.",
    story: `Asclepius, son of Apollo, learned medicine from the centaur Chiron. His skill was so great that he brought the dead back to life, and Zeus, fearing the order of the underworld would be overturned, struck him down with a thunderbolt.

He is portrayed leaning on a staff wound with a single serpent. The serpent, which sheds its skin, stood for rebirth and healing. At temples of Asclepius throughout Greece, such as Epidaurus, patients slept hoping for the god's cure in dreams, and harmless snakes were kept there.

This staff with one serpent is still used as a symbol of medicine, including on the flag of the World Health Organization.`,
    imageAlt: "A marble head of Asclepius from the third to second century BCE, Roman. Blue glass eyes are set in a face framed by curly hair and beard.",
    annotations: [
      n("Glass eyes", "Blue glass in the eyes gives them a living gaze. This is the head of a small marble statue of the third to second century BCE."),
      n("Thick hair", "Curly hair frames the face. Asclepius was carved with a dignified middle-aged appearance like that of Zeus."),
      n("Beard", "A beard covers the chin. He is shown leaning on a staff wound with a serpent, and this staff is still the symbol of medicine today."),
    ],
  },
  "ark-of-the-covenant": {
    title: "Ark of the Covenant",
    owner: "The people of Israel",
    maker: "The craftsman Bezalel",
    power: "The seat of God's presence. Carried before the people, it parted the Jordan and brought down the walls of Jericho.",
    firstRecord: "Book of Exodus",
    summary: "The golden chest holding the tablets of the Ten Commandments. It vanished after Babylon destroyed Jerusalem.",
    story: `In Exodus, God tells Moses to build a chest of acacia wood and overlay it inside and out with pure gold. On its lid two cherubim face each other with outspread wings, and inside are placed the two tablets of the Ten Commandments.

The Israelites carried the ark on poles through the wilderness. According to the Book of Joshua, the Jordan stopped flowing when the priests bearing it set foot in the river, and the walls of Jericho fell after the ark was carried around them for seven days. When the Philistines captured it, their idols toppled and calamity struck until they sent it back.

Solomon installed the ark in the Holy of Holies of the Temple in Jerusalem. After Babylon destroyed the Temple in 587 BCE, no one knows what became of it.`,
    imageAlt: "An English gilt-copper reliquary chest of 1207–13. The box with a roof-shaped lid and animal-paw feet is densely covered in round engraved plaques, with a lock on the front.",
    annotations: [
      n("Openwork crest", "The roof ridge is decorated with openwork scrolls. On the lid of the Ark of the Covenant, two cherubim faced each other with outspread wings."),
      n("Round plaques", "Round plaques engraved with saints wrap the roof and body. This reliquary was made in England in 1207–13."),
      n("Animal-paw feet", "Feet shaped like animal paws carry the chest. The Ark was carried on poles passed through rings, and before it the walls of Jericho fell."),
    ],
  },
  "aladdins-lamp": {
    title: "Aladdin's Lamp",
    owner: "Aladdin",
    maker: "Unknown",
    power: "Rub it, and the jinni of the lamp appears to grant its owner's wishes.",
    firstRecord: "Antoine Galland, French Thousand and One Nights",
    summary: "An old lamp hidden in a cave. Rubbing it brings out a jinni who will do anything.",
    story: `The poor boy Aladdin followed a sorcerer posing as his uncle into an underground cave and brought out the old lamp the man wanted. When the sorcerer trapped him there, Aladdin rubbed the ring on his finger and escaped with the help of its jinni.

At home, when his mother rubbed the lamp to clean it, a huge jinni appeared. With its power Aladdin grew rich, married the sultan's daughter and built a palace overnight. The sorcerer stole the lamp by crying "New lamps for old," but Aladdin finally got it back.

This story is not in the Arabic manuscripts. The Frenchman Antoine Galland heard it from the Syrian storyteller Hanna Diyab and added it to his translation of the Thousand and One Nights.`,
    imageAlt: "A ninth-century bronze oil lamp from Iran, with a pointed spout, rounded body and a feather-shaped ornament rising above a ring handle.",
    annotations: [
      n("Feather-shaped finial", "A feather-shaped ornament rises above the handle of this ninth-century Iranian bronze oil lamp."),
      n("Ring handle", "A round ring for the finger. When Aladdin's mother rubbed the lamp to clean it, an enormous jinni appeared."),
      n("Pointed spout", "A long, pointed spout that holds the wick. The wick draws oil up from the body to burn."),
    ],
  },
  "uchide-no-kozuchi": {
    title: "Uchide no Kozuchi",
    owner: "The god of fortune Daikokuten, Issun-bōshi",
    maker: "Unknown",
    power: "Shake it and whatever one desires pours out.",
    firstRecord: "Otogizōshi, “Issun-bōshi”",
    summary: "A magic mallet that grants wishes when shaken. It made the thumb-sized Issun-bōshi grow into a man.",
    story: `Uchide no Kozuchi means "little mallet of striking out." Shaking or striking it was said to bring forth whatever one wished, gold, silver or rice.

In "Issun-bōshi," a story in the Edo-period Otogizōshi, the thumb-sized boy Issun-bōshi fought and defeated a demon from inside its belly, using a needle as his sword. When a princess shook the mallet the fleeing demon dropped, Issun-bōshi became a fine grown man.

The mallet is also famous as the object held by Daikokuten, one of the seven gods of fortune, standing on bales of rice. It is often pictured with the rat, Daikoku's messenger.`,
    imageAlt: "A woodblock print (surimono) by Yashima Gakutei of about 1828, Mallet of Daikoku and a Rat. A gray rat sits on a red mallet painted with a peony, with a poem written above.",
    annotations: [
      n("Magic mallet", "The red head of a mallet painted with a peony. Shaking it brought forth whatever one wished, and it made Issun-bōshi a grown man."),
      n("Long handle", "A handle extending at a slant. Daikokuten, god of fortune, holds this mallet while standing on bales of rice."),
      n("Rat", "The rat on the mallet is Daikoku's messenger. This New Year's print (surimono) was made for the year of the rat in 1828."),
    ],
  },
};
