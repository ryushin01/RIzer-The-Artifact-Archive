import type { EnArtifact } from "./types";

const n = (title: string, body: string) => ({ title, body });

/** 켈트 신화, 인도·중국·일본·한국의 영어 번역 */
export const EN_CELTIC_ASIA: Record<string, EnArtifact> = {
  "claiomh-solais": {
    title: "Sword of Light",
    owner: "Nuada, king of the Tuatha Dé Danann",
    maker: "Unknown",
    power: "Once out of its sheath, no one can escape it.",
    firstRecord: "Book of Invasions (Lebor Gabála Érenn)",
    summary: "One of the four treasures of the Irish gods, a sword no one could evade once it was drawn.",
    story: `The divine people of Ireland, the Tuatha Dé Danann, are said to have brought four treasures from four cities across the northern sea: the Stone of Destiny from Falias, the Spear of Lugh from Gorias, the Sword of Nuada from Findias and the Cauldron of the Dagda from Murias.

Once the sword from Findias was drawn, no one could flee from it. In later folklore it came to be called the shining "sword of light."

Nuada lost an arm at the first battle of Mag Tuired and stepped down from the throne. When the healing god Dian Cécht made him an arm of silver, he became king again as Nuada of the Silver Arm.`,
    imageAlt: "A Celtic sword and scabbard of about 60 BCE. The copper-alloy scabbard is covered in blue-green patina, and the end of the hilt splits into two curls.",
    annotations: [
      n("Anthropoid hilt", "The end of the hilt splits like a person spreading two arms, a common 'anthropoid' hilt of Celtic Iron Age swords."),
      n("Scabbard mouth", "The bronze fitting at the mouth of the scabbard. Once Nuada's sword was drawn, no one could escape it."),
      n("Patinated scabbard", "Blue-green patina covers the copper-alloy scabbard of this Celtic sword of about 60 BCE."),
    ],
  },
  "spear-of-lugh": {
    title: "Spear of Lugh",
    owner: "Lugh, god of light and skill",
    maker: "Unknown",
    power: "No battle can be won against the one who holds it.",
    firstRecord: "Book of Invasions (Lebor Gabála Érenn)",
    summary: "One of the four treasures of the Tuatha Dé Danann, the spear of victory from Gorias.",
    story: `Lugh is a god skilled in every art. When he first arrived at the Tuatha Dé Danann's palace at Tara and the doorkeeper asked what he could do, he named smith, poet, physician, warrior and sorcerer in turn, and entered because he alone possessed them all.

No battle could be won against the holder of his spear from Gorias. Later stories say the spear so thirsted for blood and shot out such flames that it had to be kept in water when not in use.

At the second battle of Mag Tuired Lugh faced Balor, one-eyed king of the Fomorians. When Balor opened the eye that killed everything it saw, Lugh pierced it and ended the fight.`,
    imageAlt: "An Etruscan bronze spearhead. Two barb-like wings extend behind a long triangular blade with a central ridge.",
    annotations: [
      n("Spear point", "A long, tapered point. No battle could be won against the bearer of Lugh's spear."),
      n("Barbs", "Hook-like barbs extend behind the blade so that it does not slip easily from a wound."),
      n("Socket", "The socket at the back held a wooden shaft. The photograph shows an Etruscan bronze spearhead."),
    ],
  },
  "gae-bulg": {
    title: "Gáe Bulg",
    owner: "The hero Cú Chulainn",
    maker: "Taught by the warrior woman Scáthach",
    power: "Thrown with the foot, its barbs open inside the body so that it cannot be pulled out.",
    firstRecord: "The Cattle Raid of Cooley",
    summary: "The spear of Ireland's greatest hero, Cú Chulainn, given to him alone by his teacher Scáthach.",
    story: `Cú Chulainn learned the arts of war from the warrior woman Scáthach on the Isle of Skye across the sea. Having taught him every feat, Scáthach passed on the Gáe Bulg and its use to him alone.

The Gáe Bulg was cast from between the toes and kicked through the water. Inside an enemy's body thirty barbs opened, so that it could not be taken out without cutting the body open.

In The Cattle Raid of Cooley, Cú Chulainn fought for four days at a ford against Ferdiad, a friend as close as a brother. He finally brought Ferdiad down with the Gáe Bulg, and held him in long mourning.`,
    imageAlt: "An Indonesian spear of the eighteenth to nineteenth century. Three pairs of crescent-shaped barbs rise in tiers along both sides of a broad steel blade.",
    annotations: [
      n("Spear tip", "A broadly curving spearhead. The Gáe Bulg was the spear the warrior Scáthach gave only to Cú Chulainn."),
      n("Tiers of barbs", "Crescent-shaped barbs rise in tiers on both sides. The legendary Gáe Bulg opened thirty barbs inside the body so it could not be removed."),
      n("Binding", "The head is firmly bound to the shaft with cord and resin. The photograph shows an Indonesian spear of the eighteenth to nineteenth century."),
    ],
  },
  fragarach: {
    title: "Fragarach",
    owner: "The sea god Manannán, later Lugh",
    maker: "Unknown",
    power: "Held to the throat, it prevents its victim from moving or lying. Wounds from it never heal.",
    firstRecord: "The Fate of the Children of Tuireann",
    summary: "The sword called “the Answerer,” given to Lugh by the sea god Manannán.",
    story: `Fragarach means "the answerer" or "the retaliator" in Irish. It was the sword of the sea god Manannán mac Lir and later passed to Lugh, god of light.

A person held at the throat by this sword could neither move nor lie. No one survived its wounds, and no armor could stop its blade.

In the later tale "The Fate of the Children of Tuireann," Lugh wore this sword to battle against the Fomorians. On the three sons of Tuireann, who had killed his father, he laid the penalty of gathering treasures from the ends of the earth.`,
    imageAlt: "A Cypriot iron sword of the sixth century BCE. A hilt end survives above a straight blade thick with rust, with one silver rivet gleaming.",
    annotations: [
      n("Hilt end", "A single silver rivet gleams on the rusted hilt end. The hilt was once decorated in silver and bronze. This is a Cypriot sword of the sixth century BCE."),
      n("Straight blade", "A straight iron blade thick with rust. No armor could stop Fragarach, and wounds from it did not heal."),
      n("Point", "A narrowly tapered point. Lugh held this sword to the throat so that a person could neither move nor lie."),
    ],
  },
  caladbolg: {
    title: "Caladbolg",
    owner: "The Ulster hero Fergus mac Róich",
    maker: "The fairy folk",
    power: "When swung it lengthens like a rainbow and shears off the tops of hills.",
    firstRecord: "The Cattle Raid of Cooley",
    summary: "The sword of Fergus. Its name shares a root with the Welsh Caledfwlch, that is, Excalibur.",
    story: `Fergus mac Róich was a former king of Ulster, driven from the throne, who fought for Connacht against Ulster. His sword Caladbolg was said to stretch out long like a rainbow when swung.

In the last great battle of The Cattle Raid of Cooley, Fergus swept through the Ulster army with Caladbolg. When his old comrade Cormac urged him to remember his homeland, Fergus turned the sword from men to hills and struck off the tops of the three hills of Meath.

Scholars regard Caladbolg as a name of the same root as the Welsh Caledfwlch, and so as Excalibur. The legend of a "shining sword" widespread in the Celtic world attached itself to different heroes in different places.`,
    imageAlt: "An iron sword from Roman Gaul of the second century BCE to first century CE. The blade, with its bronze hilt, is heavily rusted and uneven.",
    annotations: [
      n("Pommel", "A rusted lump of a pommel. Caladbolg is a name of the same root as the Welsh Caledfwlch, that is, Excalibur."),
      n("Bronze grip", "A bronze grip with patina. This is a sword of Gaul of the second century BCE to the first century CE."),
      n("Rusted blade", "The iron blade is rusted and uneven. Fergus turned Caladbolg from men to hills and struck the tops off three hills."),
    ],
  },
  "cauldron-of-dagda": {
    title: "Cauldron of the Dagda",
    owner: "The Dagda, god of the Tuatha Dé Danann",
    maker: "Unknown",
    power: "It never runs dry, however many eat. None left it unsatisfied.",
    firstRecord: "Book of Invasions (Lebor Gabála Érenn)",
    summary: "One of the four treasures of the Tuatha Dé Danann, the cauldron of plenty from Murias.",
    story: `The Dagda, "the good god," is a father-figure among the Tuatha Dé Danann. He owned a great club, one end of which killed and the other revived, and a cauldron that never ran dry.

The cauldron from Murias never emptied however many people ate from it, and no one is said to have left it unsatisfied.

When the Fomorians mockingly made him an enormous quantity of porridge and threatened to kill him if he failed to finish it, the Dagda ladled it all down. The Irish could not think of the cauldron of plenty apart from the Dagda.`,
    imageAlt: "An Etruscan bronze cauldron of about 550 BCE. The round body has a lid and hanging rings, with blotches of blue-green patina on its surface.",
    annotations: [
      n("Lid", "A round lid with a handle ring. The Dagda's cauldron was one of the four treasures the Tuatha Dé Danann brought from Murias."),
      n("Hanging rings", "Rings on both sides let it hang over a fire."),
      n("Round body", "A round body blotched with patina. The Dagda's cauldron never emptied however many ate. The photograph shows an Etruscan bronze cauldron of about 550 BCE."),
    ],
  },
  vajra: {
    title: "Vajra",
    owner: "Indra, king of the gods",
    maker: "The artisan god Tvashtar",
    power: "Unbreakable as diamond and striking like lightning. It slew Vritra, the serpent of drought.",
    firstRecord: "Rigveda",
    summary: "The thunderbolt of Indra, which became in Buddhism the ritual implement that shatters delusion.",
    story: `Indra, the god most praised in the Rigveda, fights with the vajra. When the great serpent Vritra imprisoned the world's waters and caused drought, Indra struck him down with the vajra and released the rivers.

Later stories say the weapon was made from the bones of the sage Dadhichi. When the gods were losing to the demons, Dadhichi gave up his life and the artisan god made the vajra from his bones.

Vajra means both "thunderbolt" and "diamond." In Buddhism and Tibetan esoteric practice it became the ritual implement called dorje, standing for wisdom nothing can break, and is used paired with a bell.`,
    imageAlt: "A twelfth-century Vietnamese bronze vajra. Hook-like prongs gather at both ends of a central grip.",
    annotations: [
      n("Central grip", "The central rounded section is held in the hand. Indra swung the vajra to bring down the serpent Vritra, who had imprisoned the waters."),
      n("Hooked prongs", "The prongs at both ends curve like hooks and converge to a point. In Buddhism it became the ritual implement that shatters delusion."),
      n("Lotus base", "Lotus petals surround the place between prongs and grip. The photograph shows a twelfth-century Vietnamese bronze vajra."),
    ],
  },
  trishula: {
    title: "Trishula",
    owner: "Shiva, god of destruction and renewal",
    maker: "Unknown",
    power: "Its three prongs govern creation, preservation and destruction, or past, present and future.",
    firstRecord: "Mahabharata",
    summary: "Shiva's trident. Its three blades stand for three worlds and three powers.",
    story: `Trishula means "three spikes" and is the object most representative of Shiva. He is shown with this trident driving away demons.

The three prongs are interpreted in many ways: as the three powers of creation, preservation and destruction, as the three times of past, present and future, or as the three qualities of the human mind.

The goddess Durga too killed the buffalo demon Mahishasura with a trident received from Shiva. Even today a trident often stands in front of Shiva temples in India.`,
    imageAlt: "A hand-colored lithograph from Calcutta, India, 1878–1883, Shiva Mahadev. Shiva, wearing a tiger skin, walks a mountain path with a trident on his shoulder.",
    annotations: [
      n("Trident", "The trident Shiva carries on his shoulder. Its three prongs are read as creation, preservation and destruction."),
      n("Wild hair and beard", "Tousled hair and a long beard. Shiva is often pictured as an ascetic practicing in the Himalayas."),
      n("Tiger skin", "A tiger skin wraps his waist. This is a colored lithograph printed in Calcutta in 1878–1883."),
    ],
  },
  "sudarshana-chakra": {
    title: "Sudarshana Chakra",
    owner: "Vishnu, Krishna",
    maker: "The artisan god Vishvakarma",
    power: "A disc with 108 teeth. Thrown, it cuts down enemies and returns to the hand.",
    firstRecord: "Mahabharata",
    summary: "Vishnu's spinning disc, with which Krishna beheaded Shishupala.",
    story: `Vishnu holds in his four hands a conch, a mace, a lotus and the shining disc Sudarshana Chakra. This weapon, whose name means "beautiful to behold," spun on his fingertip, flew off to cut down enemies and returned.

In the Mahabharata, Krishna, an avatar of Vishnu, tolerates Shishupala's insults a hundred times, then at the hundred and first hurls this disc and takes off his head.

When gods and demons fought over the nectar of immortality, this was also the disc that beheaded Rahu, the demon who secretly drank it. Only his head survived, and it is said eclipses happen when Rahu tries to swallow the sun and moon.`,
    imageAlt: "A gilt-copper Vishnu from the Kathmandu Valley in Nepal, dated 1105. The four-armed Vishnu stands on a pedestal holding a wheel-shaped disc and a mace in his upper hands.",
    annotations: [
      n("Disc", "The wheel-shaped disc in his upper left hand. The Sudarshana Chakra spins from the fingertip, flies out to cut down enemies and returns."),
      n("Mace", "The mace in his upper right hand. Vishnu holds disc, mace, conch and lotus in his four hands."),
      n("Crown and halo", "A tall crown and halo behind. This gilt-copper figure was made in the Kathmandu Valley of Nepal in 1105."),
    ],
  },
  gandiva: {
    title: "Gandiva",
    owner: "The hero Arjuna",
    maker: "The creator god Brahma",
    power: "Paired with a quiver that never empties, its bowstring sounds like thunder.",
    firstRecord: "Mahabharata",
    summary: "The bow of Arjuna, master archer of the Mahabharata, delivered to him by the fire god Agni.",
    story: `The fire god Agni wished to restore his strength by burning the Khandava forest, but Indra, its protector, kept sending rain to stop him. Agni asked Krishna and Arjuna for help and, in return, obtained from the water god Varuna the bow Gandiva and two inexhaustible quivers, which he gave to Arjuna.

Gandiva was made by Brahma and reached Arjuna through the hands of many gods and heroes. When Arjuna drew its string it sounded like thunder.

At the great war of Kurukshetra Arjuna felled countless enemies with Gandiva. When the time came for him to end his life, he cast the bow into the sea and returned it to Varuna.`,
    imageAlt: "A page from the Razmnama, the Persian translation of the Mahabharata, painted in Mughal India about 1616–17, Arjuna Battles Raja Tamradhvaja. Warriors on chariots, horses and elephants fight between blocks of text.",
    annotations: [
      n("Chariot and warriors", "A horse-drawn chariot and archers tangle in the central band. Arjuna took up Gandiva and rode in the chariot driven by Krishna."),
      n("Elephant corps", "Warriors on elephants press forward below. The war of the Mahabharata was fought with chariots, elephants, cavalry and foot soldiers."),
      n("Persian text", "The text of the Razmnama, the Persian translation of the Mahabharata, appears above. The Mughal emperor Akbar ordered this translation."),
    ],
  },
  amrita: {
    title: "Amrita",
    owner: "The gods",
    maker: "Obtained by churning the ocean of milk",
    power: "Whoever drinks it does not die.",
    firstRecord: "Mahabharata",
    summary: "The drink of immortality, won when gods and demons together churned the ocean of milk.",
    story: `When the gods lost their strength, Vishnu told them to join with the demons and churn the ocean of milk to obtain the drink of immortality. With Mount Mandara as the churning rod and the great serpent Vasuki as the rope, they pulled from both sides, and Vishnu became the tortoise Kurma to bear the mountain on his back.

Along with all sorts of treasures, the poison that could burn the world rose first. Shiva swallowed it and his throat turned blue, and last of all the divine physician Dhanvantari appeared with the jar of amrita.

When the demons seized the jar, Vishnu turned into the beautiful woman Mohini, beguiled them and served amrita to the gods alone. The demon Rahu, who slipped in and drank, had his head cut off by the disc, but his head did not die.`,
    imageAlt: "A painting from Mandi in the Punjab Hills of India, about 1780–90, The Churning of the Ocean of Milk. A serpent winds around a pillar set on a tortoise, with gods and demons pulling on either side; a many-armed Vishnu sits on a lotus above, among a white horse, an elephant, the sun and the moon.",
    annotations: [
      n("Vishnu on the lotus", "A many-armed Vishnu sits on the lotus atop the pillar. Vishnu had gods and demons churn the sea together to obtain the drink of immortality."),
      n("Gods and demons pulling the serpent", "Gods pull from the left and demons from the right on Vasuki, the serpent wound around the pillar, Mount Mandara."),
      n("Tortoise", "A tortoise holds up the mountain on its back beneath the pillar. This is Vishnu in the form of the tortoise Kurma."),
    ],
  },
  "kavacha-kundala": {
    title: "Kavacha and Kundala",
    owner: "The hero Karna",
    maker: "Surya, god of the sun",
    power: "Golden armor and earrings one with his body. While he wears them, Karna cannot die.",
    firstRecord: "Mahabharata",
    summary: "The armor and earrings Karna, son of the sun god, was born with, and gave away.",
    story: `While still a maiden, Kunti called on the sun god Surya with a spell she had received, and bore a son. The child Karna was born wearing golden armor and earrings attached to his body, and while he had them no one could kill him.

Before the great war of Kurukshetra, Indra, king of the gods and father of Arjuna, disguised himself as a Brahmin and went to Karna. Karna was famous for giving whatever anyone asked.

Surya warned him in a dream, but Karna cut the armor and earrings from his own skin and handed them to Indra. Moved, Indra gave him a spear he could use only once. Karna's generosity is still praised in India today.`,
    imageAlt: "A gold earring from the Kathmandu Valley in Nepal, seventeenth or eighteenth century. Red and blue gems set in a gold wire framework show Vishnu riding the bird Garuda, with pearls and gold disks hanging below.",
    annotations: [
      n("Vishnu on Garuda", "Vishnu appears in blue stone at the center, with the bird Garuda's red face below. Karna, son of the sun god Surya, was born wearing golden earrings and armor."),
      n("Jeweled gold frame", "Red and blue stones are set into a framework of gold wire. Earrings like this were hung on images of the gods in Nepalese temples."),
      n("Pearls and gold disks", "Strands of pearls and gold disks sway below. Karna kept his vow to give whatever was asked, and cut his earrings and armor from his own skin for Indra."),
    ],
  },
  cintamani: {
    title: "Cintamani",
    owner: "Bodhisattvas such as Kshitigarbha and Cintamanicakra",
    maker: "Unknown",
    power: "A jewel that grants whatever one wishes.",
    firstRecord: "Mahayana Buddhist sutras",
    summary: "The wish-fulfilling jewel, revered in both Buddhism and Hinduism.",
    story: `Cintamani means "thought-jewel" in Sanskrit. Whoever held this jewel could obtain anything desired; it gave light in the dark, removed poison and cured disease.

In Buddhism it symbolizes the Buddha's teaching and the compassion of bodhisattvas. Kshitigarbha and Cintamanicakra hold it in their hands and grant the wishes of living beings.

The jewel that dragons clutch or chase in East Asian paintings is also the cintamani. It was believed that only a dragon who obtained it could rise to heaven.`,
    imageAlt: "A tile from Ottoman Turkey of about 1560–70. On a deep blue ground it bears the cintamani pattern: three white orbs with red dots and rippling white stripes.",
    annotations: [
      n("Three orbs", "Orbs in groups of three form the 'cintamani' pattern, named after the jewel that grants any wish."),
      n("Wavy stripes", "The rippling stripes beside the orbs are read as tiger stripes or clouds. This pattern was a favorite of the sixteenth-century Ottoman court."),
    ],
  },
  "gan-jiang-mo-ye": {
    title: "Gan Jiang and Mo Ye",
    owner: "King Helü of Wu",
    maker: "The sword-making couple Gan Jiang and Mo Ye",
    power: "A male and female pair of swords that cut iron like mud.",
    firstRecord: "Spring and Autumn Annals of Wu and Yue",
    summary: "A pair of swords named for the couple who forged them, the beginning of China's famous-sword legends.",
    story: `According to the Spring and Autumn Annals of Wu and Yue, King Helü of Wu ordered the smith Gan Jiang to forge famous swords. But after three months the metal would not melt.

Gan Jiang's wife Mo Ye, having heard that smiths of old had given themselves when iron would not melt, cut off her hair and fingernails and put them in the furnace. The iron melted and became two swords, and the couple named the male sword Gan Jiang and the female Mo Ye.

The Jin-dynasty Soushen Ji tells a different story, in which the king of Chu kills Gan Jiang after receiving his sword, and Gan Jiang's son gives his life for revenge. "Gan Jiang and Mo Ye" came to mean any famous sword.`,
    imageAlt: "A Chinese bronze sword of the fifth to fourth century BCE, with a ridge along the center of its straight double-edged blade and rings around the grip.",
    annotations: [
      n("Ringed grip", "Two ring bands circle the grip, the form of bronze swords of the states of Wu and Yue."),
      n("Writing on the blade", "Faint characters are visible on the blade. After three months of failing to melt the iron, Gan Jiang and Mo Ye at last made a male and female pair."),
      n("Tip", "A narrowly tapered point. This is a Chinese bronze sword of the fifth to fourth century BCE."),
    ],
  },
  "ruyi-jingu-bang": {
    title: "Ruyi Jingu Bang",
    owner: "Sun Wukong",
    maker: "An iron pillar once used by King Yu to measure the sea",
    power: "Weighs 13,500 catties. Grows and shrinks at will, down to a needle for tucking in the ear.",
    firstRecord: "Wu Cheng'en, Journey to the West",
    summary: "The staff Sun Wukong took from the palace of the Dragon King of the East Sea, capped with gold at each end.",
    story: `Sun Wukong went to the palace of the Dragon King of the East Sea in search of a weapon. When he rejected every spear and sword offered as too light, the Dragon King pointed to an iron pillar lodged at the bottom of the sea, once used by King Yu of Xia to measure the depths when he controlled the floods.

The pillar shone and shrank as Sun Wukong approached. Gold bands circled its ends, and it was inscribed "Ruyi Jingu Bang, weight 13,500 catties."

The staff grew as tall as heaven or shrank as small as a needle at his wish. Sun Wukong usually carried it reduced to a needle inside his ear.`,
    imageAlt: "A Japanese woodblock print of about 1824 by Yashima Gakutei, Sun Wukong. The monkey king in red robes stands on ground spread with clouds, a long staff on his back, blowing out a swarm of tiny monkeys.",
    annotations: [
      n("Staff on his shoulder", "A long staff carried at an angle behind the back. Ruyi Jingu Bang is an iron pillar of 13,500 catties that grows and shrinks at will."),
      n("Tiny monkeys blown out", "A breath sends a swarm of tiny monkeys into the air. Sun Wukong plucks his hairs and blows on them to make countless copies of himself."),
      n("Clouds", "Clouds spread at his feet. Sun Wukong rides the Somersault Cloud, 108,000 li to a leap. This woodblock print is by Yashima Gakutei, about 1824."),
    ],
  },
  "green-dragon-crescent-blade": {
    title: "Green Dragon Crescent Blade",
    owner: "Guan Yu",
    maker: "Unknown",
    power: "A great blade weighing 82 catties, also called “Cold Beauty.”",
    firstRecord: "Luo Guanzhong, Romance of the Three Kingdoms",
    summary: "The great crescent-shaped blade wielded by Guan Yu in the Romance of the Three Kingdoms.",
    story: `In the Romance of the Three Kingdoms, Liu Bei, Guan Yu and Zhang Fei swear brotherhood in a peach garden and then each prepare weapons. Guan Yu made the Green Dragon Crescent Blade, weighing 82 catties. Its edge was shaped like a reclining crescent moon and carved with a dragon.

With this blade Guan Yu cut down Dong Zhuo's fierce general Hua Xiong before his wine could cool, and felled Yuan Shao's generals Yan Liang and Wen Chou. Leaving Cao Cao to return to Liu Bei, he killed six generals at five passes.

The historical Records of the Three Kingdoms does not say Guan Yu used such a blade. It became his symbol through storytellers of the Song and Yuan. Today it stands beside him in temples dedicated to Guan Yu.`,
    imageAlt: "A nineteenth-century Jingdezhen porcelain figure of Guan Yu. Dressed in green armor and robes, Guan Yu sits stroking his long beard with one hand.",
    annotations: [
      n("Hand stroking the beard", "One hand strokes a long beard. Guan Yu was called 'Lord of the Beautiful Beard.'"),
      n("Green armor", "Armor and robes in green glaze. Guan Yu is pictured in a green battle robe holding the Green Dragon Crescent Blade."),
      n("Seated pose", "A nineteenth-century porcelain figure of Guan Yu from Jingdezhen, China. Today Guan Yu is worshiped in temples as a god of war and wealth."),
    ],
  },
  "sky-piercer": {
    title: "Sky Piercer",
    owner: "Lü Bu",
    maker: "Unknown",
    power: "A halberd with a crescent blade beside the spear point. Lü Bu hit its small branch with an arrow at 150 paces.",
    firstRecord: "Luo Guanzhong, Romance of the Three Kingdoms",
    summary: "The halberd of Lü Bu, greatest warrior of the Romance of the Three Kingdoms.",
    story: `Lü Bu in the Romance of the Three Kingdoms fights in a red brocade robe, riding Red Hare and wielding the Sky Piercer. At Hulao Pass he took on the three brothers Liu Bei, Guan Yu and Zhang Fei all at once.

The Sky Piercer is a halberd with a crescent-shaped blade beside its spear point. To stop a fight between Yuan Shu's general Ji Ling and Liu Bei, Lü Bu planted the halberd 150 paces outside the camp gate and said they should stop fighting if he hit its small branch with an arrow. The arrow struck the branch exactly.

This episode of shooting at the halberd also appears in the historical Records of the Three Kingdoms, which says only that what he hit was the small branch of the halberd.`,
    imageAlt: "A Chinese bronze halberd head (ge) of the Zhou dynasty, 1122–255 BCE. A horizontal blade and the part inserted into the shaft form a T.",
    annotations: [
      n("Horizontal blade", "A bronze blade set crosswise on a shaft. Adding a spear point makes a ji, and Lü Bu's Sky Piercer gives the blade a crescent form."),
      n("Holes for binding", "A cord through the holes at the base of the blade fixed it to the wooden shaft."),
      n("Downward extension", "The long extension below the blade was used to hook and pull an opponent. This is a Zhou-dynasty bronze of the eleventh to third century BCE."),
    ],
  },
  "red-hare": {
    title: "Red Hare",
    owner: "Lü Bu, later Guan Yu",
    maker: "Unknown",
    power: "Runs a thousand li a day and crosses rivers and mountains as if on level ground.",
    firstRecord: "Chen Shou, Records of the Three Kingdoms, Biography of Lü Bu",
    summary: "A famous horse red as burning charcoal. “Among men Lü Bu, among horses Red Hare,” went the saying.",
    story: `The Biography of Lü Bu in the Records of the Three Kingdoms says he had a fine horse named Red Hare. Pei Songzhi's commentary records that people of the time said, "Among men Lü Bu, among horses Red Hare."

The Romance of the Three Kingdoms adds more. Dong Zhuo used Red Hare to lure Lü Bu into betraying his foster father Ding Yuan. After Lü Bu died Cao Cao gave the horse to Guan Yu to win his heart, and Guan Yu rejoiced that with it he could reach his elder brother Liu Bei in a single day if he learned where he was.

The Romance says that after Guan Yu's death Red Hare refused to eat and followed him in death.`,
    imageAlt: "A bronze horse of the late seventeenth century. Mane flying, it leaps with forelegs raised high on a black base.",
    annotations: [
      n("Head with flying mane", "The head is raised and the mane flies. Red Hare was said to run a thousand li in a day."),
      n("Raised forelegs", "He leaps with forelegs held high. After Lü Bu died, Cao Cao gave this horse to Guan Yu to win his heart."),
      n("Tail", "A tail streaming behind. This is a bronze horse by the Italian sculptor Francesco Fanelli, of the late seventeenth century."),
    ],
  },
  "nine-tripods": {
    title: "Nine Tripod Cauldrons",
    owner: "The royal houses of Xia, Shang and Zhou",
    maker: "King Yu of Xia",
    power: "The legitimacy to rule all under heaven. They rest with dynasties of virtue.",
    firstRecord: "Zuo Zhuan",
    summary: "Nine cauldrons King Yu cast from metal sent by the nine provinces, signifying dynastic legitimacy.",
    story: `King Yu of Xia, who controlled the floods, divided the realm into nine provinces and cast nine great cauldrons from metal each province sent him. The mountains, rivers and monsters of each region are said to have been depicted on them, so that people would know what to avoid.

The Nine Tripods passed from Xia to Shang and then to Zhou. According to the Zuo Zhuan, when King Zhuang of Chu asked a Zhou envoy their size and weight, the envoy replied, "It depends on virtue, not on the tripods." To "ask the weight of the tripods" still means to covet another's power.

After the Zhou fell the Nine Tripods vanished. The Records of the Grand Historian says the First Emperor of Qin sent a thousand men into the Si River to retrieve a sunken cauldron, but they could not find it.`,
    imageAlt: "A thirteenth-century BCE Chinese bronze tripod cauldron (ding) of the Shang dynasty. A band of animal-face design rings the round vessel with two upright handles, under blue-green patina.",
    annotations: [
      n("Upright handles", "Handles rise on both sides of the mouth. A pole through them was used to lift and carry the cauldron."),
      n("Animal-face band", "A band of animal faces and spirals rings the mouth. King Yu is said to have cast the mountains, rivers and monsters of each region onto his nine cauldrons."),
      n("Three legs", "Three stout legs bear the cauldron. This is a Shang-dynasty bronze ding of the thirteenth century BCE."),
    ],
  },
  "heirloom-seal": {
    title: "Heirloom Seal of the Realm",
    owner: "The First Emperor of Qin and later emperors",
    maker: "Calligraphy by the Qin chancellor Li Si",
    power: "“Having received the mandate of heaven, may it flourish forever.” Whoever holds this seal is emperor.",
    firstRecord: "Ban Gu, Book of Han",
    summary: "The jade seal of the First Emperor, said to be made from the Jade of Bian He, the symbol of imperial legitimacy.",
    story: `Legend says this seal was made from the Jade of Bian He. Bian He of Chu found a piece of jade in the mountains and presented it to two kings, but had his feet cut off twice for offering a mere stone. Only when a third king had the stone split was it known to be the greatest jade under heaven.

The First Emperor had this jade made into a seal, and Chancellor Li Si wrote eight characters: "Having received the mandate of heaven, may it flourish forever." From then on the holder of this seal was regarded as the emperor recognized by heaven.

The Book of Han records that when Wang Mang seized the Han, the empress dowager hurled the seal to the ground, and later accounts say a corner broke off and was repaired with gold. The seal changed owners with each dynasty until it vanished around the Five Dynasties and Ten Kingdoms period.`,
    imageAlt: "An early twentieth-century Chinese jade seal. A rounded knob sits on a square body and is pierced for a cord.",
    annotations: [
      n("Rounded knob", "The rounded knob on the seal. The knob of the Heirloom Seal is said to have been carved with five intertwined dragons."),
      n("Cord hole", "A hole pierces the knob for a cord, by which a seal was worn at the waist."),
      n("Square body", "The square base where the characters are carved. The Heirloom Seal bore the eight characters 'Having received the mandate of heaven, may it flourish forever.'"),
    ],
  },
  "banana-leaf-fan": {
    title: "Banana-Leaf Fan",
    owner: "Princess Iron Fan (Rākṣasī)",
    maker: "Unknown",
    power: "One wave puts out fire, two bring wind, three bring rain.",
    firstRecord: "Wu Cheng'en, Journey to the West",
    summary: "The fan of Princess Iron Fan that extinguishes the Flaming Mountains. Sun Wukong fought three times to get it.",
    story: `On their way west, Tripitaka's party met the Flaming Mountains, where fire burned for eight hundred li. To put it out they needed the banana-leaf fan of Princess Iron Fan, wife of the Bull Demon King.

Holding a grudge because Sun Wukong had handed her son Red Boy over to Guanyin, the princess refused to lend it. Sun Wukong turned into an insect, got into her belly and forced her to hand it over, but it was a fake that only made the fire larger.

Disguised as the Bull Demon King he took the real one, then lost it again by trickery, and won it only after three fights. Waving the fan forty-nine times, he put out the fire of the Flaming Mountains forever.`,
    imageAlt: "A late nineteenth-century round fan painting by the Chinese painter Shu Hao, Zhou Dunyi Admiring Lotus Flowers. A scholar seated in a pavilion by a pond and lotus leaves are painted within a circular composition on silk.",
    annotations: [
      n("Scholar admiring lotuses", "A scholar seated in a pavilion gazes at the lotuses. In 'On the Love of the Lotus,' the Song scholar Zhou Dunyi praised the lotus that rises unstained from mud."),
      n("Lotus leaves", "Lotus leaves fill the pond, arranged to follow the round fan composition."),
      n("Writing and seals", "The painter Shu Hao's writing and seals appear at upper left. Princess Iron Fan's banana-leaf fan put out fire at a single wave."),
    ],
  },
  "peaches-of-immortality": {
    title: "Peaches of Immortality",
    owner: "Xiwangmu, Queen Mother of the West",
    maker: "The orchard of Xiwangmu",
    power: "Fruiting once in three thousand years, they make those who eat them immortal and ageless.",
    firstRecord: "Han Wu Gushi",
    summary: "The peaches of the Queen Mother of the West, which Sun Wukong secretly ate while guarding them.",
    story: `Xiwangmu, goddess of Mount Kunlun, grows peaches of immortality. In the Han Wu Gushi, she visits Emperor Wu of Han and shares her peaches; when the emperor tries to plant the stones, she laughs and says they fruit only once in three thousand years.

In Journey to the West the Jade Emperor puts Sun Wukong in charge of the peach orchard. The peaches ripen in three varieties, once every three, six or nine thousand years, and those who eat the ripe fruit become immortals or live as long as heaven and earth.

Learning he had not been invited to the banquet, Sun Wukong devoured all the peaches, setting off a great uproar in heaven.`,
    imageAlt: "A mid-eighteenth-century porcelain vase from Jingdezhen, China, painted in overglaze enamels. Branches with nine pink peaches are painted on a white ground.",
    annotations: [
      n("Peaches", "Pink peaches hang from the branch. Xiwangmu's peaches fruit once in three thousand years and keep those who eat them from aging."),
      n("Branches and flowers", "Peach branches and flowers climb the shoulder of the vase. Sun Wukong guarded the orchard and ate all the peaches."),
      n("Rounded body", "A globular 'celestial sphere' shape. This is overglaze-enameled porcelain fired at Jingdezhen in the mid-eighteenth century."),
    ],
  },
  "golden-headband": {
    title: "Golden Headband",
    owner: "Sun Wukong (controlled by Tripitaka)",
    maker: "Given to Tripitaka by Guanyin",
    power: "When a spell is recited it tightens around the head and subdues Sun Wukong.",
    firstRecord: "Wu Cheng'en, Journey to the West",
    summary: "The gold band Tripitaka placed on the unruly Sun Wukong.",
    story: `Soon after being freed from under the Five Elements Mountain and becoming Tripitaka's disciple, Sun Wukong killed some bandits and left his master in anger after being scolded.

Guanyin gave Tripitaka a flowered cap, a gold band and a spell called the Tightening Spell. When Sun Wukong came back and put on the cap, the band stuck fast to his head, and when Tripitaka recited the spell it squeezed as though to split his skull.

Sun Wukong tried to twist the band off with his staff, to no avail. From then on he protected his master on the whole journey west. When he became a Buddha in the West, the band vanished on its own.`,
    imageAlt: "A Japanese iron sword guard (tsuba) of the Edo period. Pierced monkeys link around the central sword opening, holding hands in a ring.",
    annotations: [
      n("Monkeys at the top", "Monkeys hold each other's hands and tails, linked in a ring. Sun Wukong was king of the monkeys of Flower-Fruit Mountain."),
      n("Sword opening", "The central opening holds the blade, and the small openings on either side take a small knife and a hairpin. This is a Japanese sword guard (tsuba)."),
      n("Gold-lined opening", "Gold lines the edge of the right opening, gleaming like the Golden Headband that tightened around Sun Wukong's head."),
    ],
  },
  "somersault-cloud": {
    title: "Somersault Cloud",
    owner: "Sun Wukong",
    maker: "Taught by his master Subodhi",
    power: "One somersault carries him 108,000 li.",
    firstRecord: "Wu Cheng'en, Journey to the West",
    summary: "The cloud ridden by Sun Wukong. A single somersault flies 108,000 li.",
    story: `Sun Wukong learned magic from his master Subodhi, including how to ride clouds. Because he mounted a cloud with a tumbling motion instead of the elegance of other immortals, his master taught him the Somersault Cloud to suit him: one flip would carry him 108,000 li.

After causing an uproar in heaven, Sun Wukong made a wager with the Buddha. If he could leap out of the Buddha's palm, heaven would be his.

Sun Wukong flew on the cloud to the end of the world, wrote "The Great Sage Equal to Heaven was here" on five pillars and came back. But the pillars were the Buddha's five fingers. Sun Wukong was at once imprisoned under the Five Elements Mountain.`,
    imageAlt: "A Chinese hanging scroll of the sixteenth to seventeenth century, Cloud Rock. A strange rock billowing up like a cloud is painted in ink on silk.",
    annotations: [
      n("Cloud-like rock", "A rock billowing up like a cloud is painted in ink on silk. Sun Wukong's Somersault Cloud flies 108,000 li at a single flip."),
      n("Inscription and seals", "The painter's writing and seals appear at upper right. This is a hanging scroll of the Ming dynasty, sixteenth to seventeenth century."),
    ],
  },
  "yasakani-no-magatama": {
    title: "Yasakani no Magatama",
    owner: "Amaterasu, the Japanese imperial house",
    maker: "Tamanooya, deity of jewels",
    power: "One of the three sacred treasures, holding the spirit of the gods and the legitimacy of the imperial line.",
    firstRecord: "Kojiki",
    summary: "The curved jewel used with the mirror to call Amaterasu out of the cave, one of Japan's three imperial treasures.",
    story: `When Amaterasu hid in the rock cave of heaven and the world grew dark, the gods hung a mirror and many curved beads on a sacred tree before the cave. The deity who made those beads was Tamanooya.

Yasakani no Magatama is said to be a necklace strung with those beads. Magatama are curved beads shaped like animal teeth or a fetus, found in great numbers in ancient tombs of Japan and the Korean peninsula.

It became one of the three imperial treasures, along with the mirror Yata no Kagami and the sword Kusanagi. While the mirror and sword are enshrined elsewhere with replicas kept in the palace, the jewel alone is said to remain in the palace in its original form.`,
    imageAlt: "A Japanese necklace of about the seventh century. Curved chalcedony beads (magatama) are strung among green jasper tube beads and laid in a circle.",
    annotations: [
      n("Curved bead", "A curved bead (magatama) cut from chalcedony. Yasakani no Magatama is one of Japan's three imperial treasures."),
      n("Tube beads", "Green jasper tube beads are strung between them. This is a necklace of about the seventh century, Japan's Kofun period."),
      n("Ring of beads", "The beads are joined into a circle. When Amaterasu hid in the cave, the gods hung beads and a mirror on a tree to call her out."),
    ],
  },
  "ame-no-nuboko": {
    title: "Ame-no-Nuboko",
    owner: "The creator deities Izanagi and Izanami",
    maker: "Bestowed by the gods of heaven",
    power: "Churned the sea and made the first land.",
    firstRecord: "Kojiki",
    summary: "The jeweled spear that first made land in Japanese myth.",
    story: `According to the Kojiki, the gods of heaven gave the deities Izanagi and Izanami a jeweled spear, Ame-no-Nuboko, telling them to harden the land still drifting about.

Standing on the floating bridge of heaven, the two deities lowered the spear into the sea and stirred. When they lifted it, drops of brine falling from the tip piled up to form the first island, Onogoro.

The two descended to that island, married and gave birth to the islands of Japan and many gods. The spear is remembered in Japanese myth as the tool that first made the world.`,
    imageAlt: "A seventeenth-century Japanese hand spear (nage-yari) with its sheath. A black sheath lies beside the slender blade, and the shaft is wrapped with cord.",
    annotations: [
      n("Spear blade", "A slender, straight blade. Izanagi and Izanami stirred the sea with Ame-no-Nuboko from the bridge of heaven."),
      n("Sheath", "A black sheath that covers the blade. When the spear was raised, brine dripping from its tip piled up to form the first island, Onogoro."),
      n("Cord-wrapped shaft", "Cord wound around the shaft prevents slipping. This is a Japanese short hand spear of the seventeenth century."),
    ],
  },
  kurikara: {
    title: "Kurikara Sword",
    owner: "Fudō Myōō",
    maker: "Unknown",
    power: "A sword wound by a dragon wreathed in flame. It severs delusion and evil.",
    firstRecord: "Esoteric Buddhist scriptures and images of Fudō Myōō",
    summary: "The sword in the right hand of Fudō Myōō, with the dragon Kurikara winding around it and swallowing its blade.",
    story: `Fudō Myōō, a guardian of esoteric Buddhism, sits with an angry face before flames, a sword in his right hand and a rope in his left. With the sword he cuts delusion, and with the rope he binds evil.

The Kurikara sword is drawn with a black dragon wreathed in flames winding around the blade and about to swallow its tip. The word Kurikara comes from a Sanskrit name for a dragon king.

When Kūkai brought esoteric Buddhism from Tang China in the early ninth century, devotion to Fudō Myōō spread through Japan. Even now many stone images in the shape of a sword wrapped by the Kurikara dragon stand at temples and along mountain paths in Japan.`,
    imageAlt: "A seated Japanese cypress statue of Fudō Myōō from the early thirteenth century. The angry-faced deity with inlaid crystal eyes sits cross-legged holding a golden sword in his right hand and a rope in his left.",
    annotations: [
      n("Sword in the right hand", "Fudō Myōō holds a sword upright in his right hand. When a dragon wreathed in flame wraps around it, it becomes the Kurikara sword."),
      n("Angry face", "An angry face with inlaid crystal eyes. Fudō Myōō overcomes delusion and evil in this wrathful form."),
      n("Rope in the left hand", "The rope in his left hand binds wicked things. This is a Japanese cypress sculpture of the early thirteenth century."),
    ],
  },
  "totsuka-no-tsurugi": {
    title: "Totsuka no Tsurugi",
    owner: "Susanoo, god of storms",
    maker: "Unknown",
    power: "A great sword ten fists long, which cut the eight-headed serpent to pieces.",
    firstRecord: "Kojiki",
    summary: "The sword Susanoo used on Yamata-no-Orochi. Striking Kusanagi inside the serpent's tail, it chipped.",
    story: `Totsuka means "ten fists long." Many gods in the Kojiki carry such swords, but the most famous is Susanoo's.

Susanoo cut to pieces with this sword the great serpent Yamata-no-Orochi as it lay drunk. But when he cut the middle tail the blade chipped. Slitting open the tail he found another sword within, which was later called Kusanagi.

Susanoo's sword is said to have been enshrined at Isonokami Shrine and elsewhere under the name of "the sword that slew the Orochi."`,
    imageAlt: "A straight single-edged Japanese sword blade (chokutō) of the seventh century or earlier. Only the long, straight steel blade survives, with patches of rust.",
    annotations: [
      n("Tip", "A tip cut at a slant. Susanoo cut the drunken eight-headed serpent Yamata-no-Orochi to pieces with Totsuka no Tsurugi."),
      n("Straight blade", "A single-edged straight blade (chokutō), the form of the seventh century or earlier before Japanese swords began to curve."),
      n("Chipped section", "Rust and nicks mark the edge in places. Susanoo's sword chipped when it struck Kusanagi inside the serpent's tail."),
    ],
  },
  futsunomitama: {
    title: "Futsu-no-Mitama",
    owner: "Takemikazuchi, later Emperor Jimmu",
    maker: "Unknown",
    power: "A single stroke revived soldiers felled by poisonous vapors.",
    firstRecord: "Kojiki",
    summary: "The sword with which the thunder god Takemikazuchi pacified the land, sent down to the first emperor, Jimmu.",
    story: `According to the Kojiki, when Emperor Jimmu reached Kumano on his eastern expedition, a great bear appeared and the emperor and his soldiers all collapsed from poisonous vapors.

Then a man named Takakuraji, receiving a revelation in a dream, came carrying a sword. It had been sent down from heaven by the thunder god Takemikazuchi, who had used it to pacify the land. When the emperor received it he recovered, and at a single stroke the evil gods of Kumano fell of themselves.

This sword, Futsu-no-Mitama, is enshrined as the chief deity at Isonokami Shrine in Nara Prefecture. A sword unearthed in 1874 from forbidden ground at the shrine is said to be this one.`,
    imageAlt: "A fifth-century Japanese double-edged sword blade (ken) of the Kofun period. The rusted iron blade stands vertically, and the tang for the hilt survives at the bottom.",
    annotations: [
      n("Tip", "The tip of a rusted double-edged sword. Takemikazuchi is said to have pacified the gods of the land with this sword."),
      n("Rusted blade", "An iron blade from a fifth-century tomb. When Emperor Jimmu's soldiers fell to poisonous vapors, they all revived when he received this sword."),
      n("Tang", "The tang that fit into the hilt survives at the bottom. Futsu-no-Mitama is enshrined at Isonokami Shrine in Nara Prefecture."),
    ],
  },
  jamyeonggo: {
    title: "Jamyeonggo",
    owner: "The state of Nangnang",
    maker: "Unknown",
    power: "Sounds by itself when enemies invade.",
    firstRecord: "Kim Busik, Samguk Sagi",
    summary: "The drum and horn of Nangnang that sounded by themselves when enemies came. A princess in love tore the drum open.",
    story: `According to the record of King Daemusin of Goguryeo in the Samguk Sagi, Prince Hodong of Goguryeo met Choe Ri, king of Nangnang, while traveling in Okjeo. Choe Ri made Hodong his son-in-law and gave him his daughter.

Nangnang had a drum and horn that sounded by themselves when enemy troops approached. After returning to Goguryeo, Hodong sent word to his wife that if she entered the armory, tore the drum and broke the horn, he would receive her with all honors.

The princess secretly broke the drum and horn, and on Hodong's word King Daemusin launched a surprise attack on Nangnang. Unprepared because the drum did not sound, Choe Ri killed his daughter and surrendered. Later people called this drum Jamyeonggo, the drum that sounds by itself.`,
    imageAlt: "A nineteenth-century Korean janggu drum. Hide is fitted to both ends of a red-lacquered wooden body with a narrow waist and tightened with cords. It is photographed against a blue background.",
    annotations: [
      n("Hide drumhead", "Hide stretched over a wide drumhead. The Jamyeonggo of Nangnang sounded by itself when enemies invaded."),
      n("Narrow waist", "The red-lacquered wooden body narrows at the waist. The photograph shows a nineteenth-century Korean janggu."),
      n("Tension cords", "Cords lace together the two drumheads. The princess of Nangnang entered the armory and tore the drum for Prince Hodong."),
    ],
  },
  "cheonsa-okdae": {
    title: "Heavenly Jade Belt",
    owner: "King Jinpyeong of Silla, later Taejo of Goryeo",
    maker: "Delivered by a messenger from heaven",
    power: "One of the three treasures of Silla. While it remained, no one dared attack the kingdom.",
    firstRecord: "Iryeon, Samguk Yusa",
    summary: "The jade belt heaven gave King Jinpyeong, one of the three treasures of Silla.",
    story: `According to the Samguk Yusa, in the year King Jinpyeong of Silla took the throne a messenger from heaven came down to the palace courtyard and presented a jade belt, saying the Lord on High had ordered it given. The king received it on his knees and wore it at every great ceremony.

The Heavenly Jade Belt was counted among the three treasures of Silla, along with the great Buddha statue and nine-story pagoda of Hwangnyongsa Temple. It is told that a king of Goguryeo gave up a plan to invade Silla on hearing that no one could attack while these three treasures remained.

When Gyeongsun, the last king of Silla, surrendered his kingdom to Goryeo, this belt too was presented to Wang Geon, Taejo of Goryeo, who stored it in the royal treasury.`,
    imageAlt: "A twelfth-century gilt-bronze belt ornament from Goryeo Korea. A seated deer is embossed on a square plaque against a background of scrolls, with blue-green patina.",
    annotations: [
      n("Seated deer", "A deer with folded legs is embossed among scrolls. This is a gilt-bronze belt ornament of twelfth-century Goryeo."),
      n("Scroll background", "Cloud-like scrolls fill the space around the deer. The Heavenly Jade Belt was given to King Jinpyeong of Silla by a messenger from heaven."),
      n("Square border", "A border surrounds the plaque. Plaques like this were fixed in rows on a leather belt. The Heavenly Jade Belt was presented to Wang Geon when Silla surrendered to Goryeo."),
    ],
  },
};
