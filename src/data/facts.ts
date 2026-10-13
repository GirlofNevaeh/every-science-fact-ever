import type { Fact, Kind, Q, TopicId } from "@/data/types";

const RAW = `
plants-food|living|Plants make food|Plants make their food from sunlight, air, and water.|fact|If a leaf gets no light, it cannot keep making food.|The green in a leaf catches the light.||
Q|What do plants use to make food?|Sunlight, air, and water|Only rocks|Only salt|Only metal|0
Q|What happens if a leaf gets no light?|It cannot keep making food|It turns into iron|It becomes a magnet|It flies to the Moon|0
plants-oxygen|living|Plants give off oxygen|In sunlight, plants give off oxygen.|fact|People can collect the gas from water plants in bright light and test that it is oxygen.|Plants also use some oxygen, but in bright sun they make more than they use.||
Q|What gas do plants give off in sunlight?|Oxygen|Sand|Mercury|Rust|0
Q|When do plants make more oxygen than they use?|In bright sun|In a dark box|Only as fossils|Never|0
bees-pollen|living|Bees carry pollen|Bees carry pollen from flower to flower.|fact|You can watch yellow dust on a bee move from bloom to bloom.|Other insects carry pollen too.||
Q|What do bees carry between flowers?|Pollen|Magnets|Fossils|Rain clouds|0
Q|Which sentence is true?|Bees move pollen from flower to flower|Bees are a kind of metal|Bees orbit Saturn|Bees make moonlight|0
seeds-water|living|Seeds need water|Many seeds start to grow when they get water and warmth.|fact|Give water to one seed and none to another, and you can see which one sprouts.|Some seeds also need a cold spell first.||
Q|What helps many seeds start to grow?|Water and warmth|A magnet only|Loud sound only|A dry shelf forever|0
Q|How can you test what a seed needs?|Water one seed and leave another dry|Paint both seeds and guess|Hide them from every test|Freeze a rock beside them|0
fungi|living|Mushrooms are fungi|A mushroom is a fungus, not a plant.|fact|Mushrooms do not make food from sunlight the way green plants do.|Fungi get food from living or once-living things.||
Q|A mushroom belongs in which group?|Fungi|Fish|Planets|Magnets|0
Q|Why is a mushroom not a plant?|It does not make food from sunlight like a green plant|It has feathers|It is made of glass|It orbits the Sun|0
whales|living|Whales breathe air|Whales are mammals, so they breathe air.|fact|Watchers see whales come up and blow out used air.|They cannot stay under the sea the way fish do.||
Q|Whales must come up to get|Air|Lava|Sand|Moon dust|0
Q|Whales are|Mammals|Insects|Rocks|Fungi|0
cactus|living|A cactus stores water|A cactus stores water in its stem.|fact|Scientists measure water held in the thick stem.|Spines help keep animals from eating that water.||
Q|Where does a cactus store water?|In its stem|In its shadow|In a cloud|Only in its spines|0
Q|Which sentence is true?|A cactus stores water in its stem|A cactus is a metal|A cactus is a moon|A cactus is a fossil bone|0
bird-bones|living|Light bird bones|Many bird bones are hollow, which helps birds stay light.|fact|Scientists look inside bird bones and find air spaces.|Not every bird flies.||
Q|Why are many bird bones hollow?|To help the bird stay light|To store gold|To boil water|To make thunder|0
Q|Which sentence is true?|Not every bird flies|All birds are mammals|Birds are made of glass|Birds have no bones|0
coral|living|Coral is animals|Coral reefs are built by tiny animals.|fact|Under a lens you can see the little coral animals in their cups.|The hard reef is made from their skeletons.||
Q|What builds a coral reef?|Tiny animals|Clouds|Horseshoe magnets|Ice rings|0
Q|The hard part of a reef comes from|Coral skeletons|Pencil lead|Whale breath|Moon dust|0
chimp-tools|living|Chimps use tools|Some chimpanzees use sticks as tools.|fact|Jane Goodall watched a chimp peel a twig and use it to pull out insects.|She wrote down what she saw, day after day.||goodall
Q|Who watched a chimp use a stick as a tool?|Jane Goodall|Isaac Newton|Mae Jemison|Marie Curie|0
Q|What did that chimp do with the stick?|Used it to pull out insects|Flew it to the Moon|Melted it into iron|Froze the ocean with it|0
dna|living|DNA is a ladder|DNA is a long twisted ladder that holds instructions for a living thing.|fact|An X-ray picture and many later tests showed that twisted shape.|Rosalind Franklin took a key picture of DNA.||franklin
Q|What shape is DNA?|A twisted ladder|A flat plate|A horseshoe magnet|A square wheel|0
Q|Who took a key X-ray picture of DNA?|Rosalind Franklin|Mary Anning|Galileo Galilei|Michael Faraday|0
evolution|living|Living things change|Living things change over a very long time.|theory|Fossils, and the family trees of living things, are ways we test this idea.|In science a theory is a big idea that has passed many tests.||darwin
Q|Living things change over a very long time. That idea is|A theory scientists test|A wild guess with no tests|A type of metal|A moon phase|0
Q|Which is one way we test that idea?|Fossils|A single wish|The color of a magnet|The name of a boat|0
water-h2o|materials|Water is H2O|Water is H2O, two hydrogen atoms and one oxygen atom.|fact|When scientists split water, they get that same recipe every time.|Ice is solid water, and it floats on liquid water.||
Q|Which recipe names water?|H2O|CO2|NaCl|Fe|0
Q|How many hydrogen atoms are in one molecule of water?|Two|Zero|Ten|One hundred|0
states|materials|Three states|Matter can be a solid, a liquid, or a gas.|fact|You can watch the same water be ice, then liquid, then steam.|The tiny bits move more freely as it warms.||
Q|Ice, liquid water, and steam are|The same matter in three states|Three different metals|Three planets|Three bones|0
Q|Which list names three states of matter?|Solid, liquid, gas|North, south, east|Leaf, root, beak|Day, year, tide|0
ice-floats|materials|Ice floats|Ice floats on liquid water.|fact|Set a piece of ice in a glass of water and it stays at the top.|Ice takes up more room than the same water as a liquid.||
Q|What does ice do in a glass of water?|It floats|It always sinks like a stone|It turns into iron|It becomes a magnet|0
Q|Why can ice float?|It takes up more room than the same liquid water|It is heavier than gold|It has two poles|It is a fossil|0
water-boil|materials|Water boils|At sea level, water boils at 100 degrees Celsius.|fact|A thermometer reads 100 degrees when the water is bubbling hard at sea level.|High on a mountain, water boils at a lower temperature.||
Q|At sea level, water boils at|100 degrees Celsius|0 degrees Celsius|10 degrees Celsius|1000 degrees Celsius|0
Q|On a high mountain, water boils|At a lower temperature|Only as ice|Never|As hot as the Sun|0
salt-dissolves|materials|Salt dissolves|Salt can dissolve in water and seem to vanish.|fact|The salt disappears from sight, but the water tastes salty, so the salt is still there.|If the water dries up, the salt shows again.||
Q|When salt dissolves, it|Is still in the water|Turns into gold|Leaves Earth|Becomes DNA|0
Q|How can dissolved salt show again?|Let the water dry up|Add a telescope|Spin the Moon|Plant a cactus|0
rust|materials|Iron rusts|Iron rusts when it meets both water and air.|fact|A dry iron nail stays shiny longer than a wet one left in the air.|Rust is a new coat, not the shiny iron itself.||
Q|Iron rusts when it meets|Water and air|Only moonlight|Only pollen|Empty space|0
Q|Which nail stays shiny longer?|A dry nail kept from water|A nail left wet in the air|A nail made of steam|A nail with no test at all|0
glass-sand|materials|Glass from sand|People make glass by heating sand with a few other minerals until it melts.|fact|Glass shops melt the mix, then cool it into a clear solid.|Some old windows are thicker at the bottom because of how the glass was made, not because glass drips.||
Q|Glass is made by|Heating sand until it melts|Freezing frogs|Stacking pollen|Bending magnet poles|0
Q|Why is some old window glass thicker at the bottom?|Because of how it was made|Because glass slowly drips like honey|Because frogs sit on it|Because sound piles up|0
diamond-graphite|materials|Carbon two ways|Diamond and pencil graphite are both carbon, packed in different ways.|fact|Tests show both are carbon atoms locked in different patterns.|That is why one is hard and clear and the other is soft and dark.||
Q|Diamond and pencil graphite are both|Carbon|Water|Iron rust|Whale bone|0
Q|Why can carbon be hard or soft?|The atoms are packed differently|One of them is a planet|One of them is alive|One of them is a theory|0
oil-floats|materials|Oil floats|Oil floats on water because it is less dense.|fact|Pour oil gently on water and the oil stays on top.|A thin oil sheen can sit on a puddle for the same reason.||
Q|What does oil do on water?|It floats|It always sinks under rock|It becomes ice at once|It turns into a star|0
Q|Oil floats because it is|Less dense than water|Heavier than iron|A kind of bone|A moon|0
plastic|materials|Plastic chains|Most plastic is made of long chains of molecules, and a lot of it starts as oil.|fact|Chemists link small molecules into long chains and then shape them.|Some newer plastics are made from plants instead.||
Q|Most plastic is made of|Long chains of molecules|Loose sand only|Hollow bird bones|Moonlight|0
Q|A lot of plastic starts as|Oil|Whale songs|Rings of Saturn|Table salt only|0
gold|materials|Gold does not rust|Gold does not rust the way iron does.|fact|Old gold coins can stay shiny in air and water for a very long time.|Gold is still a metal, and it can be hammered very thin.||
Q|What does gold do in damp air?|It does not rust like iron|It turns into wood|It boils at 0 degrees|It becomes a cactus|0
Q|Which sentence is true?|Gold can stay shiny for a very long time|Gold is a gas in the room|Gold is a kind of DNA|Gold has three hearts|0
periodic|materials|The element table|The periodic table lines the elements up by patterns in their atoms.|fact|In that order, elements that act alike sit in families.|Dmitri Mendeleev left gaps for elements people had not found yet.||mendeleev
Q|What does the periodic table line up?|The elements|Only the planets|Only the bones|Only the oceans|0
Q|Who left gaps for elements not found yet?|Dmitri Mendeleev|Jane Goodall|Mae Jemison|Mary Anning|0
force-push|forces|A force is a push|A force is a push or a pull.|fact|A spring scale stretches when you pull, and the stretch measures the force.|Forces can start, stop, or turn a thing.||
Q|A force is|A push or a pull|A kind of fossil|A moon phase|A bone|0
Q|A spring scale measures a force because|The spring stretches|The spring turns into water|The spring orbits the Sun|The spring tastes salty|0
magnet-poles|forces|Two poles|A magnet has two poles, called north and south.|fact|Hang a bar magnet so it can turn, and the same end keeps pointing north.|Every magnet we test has both poles, not just one.||
Q|How many poles does a magnet have?|Two|One|Eight|206|0
Q|The poles of a magnet are called|North and south|Ice and steam|Bee and whale|Up and DNA|0
magnet-iron|forces|Magnets pull iron|A magnet pulls iron, but it does not pull wood, plastic, or copper.|fact|Test one magnet on an iron nail, a wooden stick, a plastic cup, and a copper coin.|Only some metals are pulled.||
Q|Which one does a magnet pull?|An iron nail|A wooden stick|A plastic cup|A cotton sock|0
Q|Does a magnet pull every metal?|No|Yes, even water|Yes, even wood|Only on the Moon|0
poles-push|forces|Poles push or pull|Opposite poles pull together, and the same poles push apart.|fact|Bring two magnet ends together and you can feel a pull or a push.|You cannot tell the poles by color. You tell them by how they act.||
Q|What do two north poles do?|They push apart|They always melt|They make honey|They become plants|0
Q|What do a north pole and a south pole do?|They pull together|They vanish|They turn into glass|They boil at once|0
gravity|forces|Things fall|Dropped things fall toward Earth, and a theory of gravity explains that pull.|theory|We measure falling things, weights, and the Moon path, and the theory predicts them well.|Scientists still test gravity in new ways.||newton
Q|What do dropped things do?|They fall toward Earth|They always float away|They turn into oil|They become fossils at once|0
Q|The deep idea of this pull is|A theory scientists keep testing|A guess with no tests|A type of plastic|A whale|0
sound-medium|forces|Sound needs stuff|Sound needs something to travel through, so it cannot cross empty space.|fact|A bell in a jar gets quieter as the air is pumped out.|Sound moves faster in water than in air.||
Q|Sound cannot travel through|Empty space|Air|Water|A metal rail|0
Q|Where does sound move faster?|In water|In empty space|In a perfect vacuum|Nowhere, ever|0
light-space|forces|Light crosses space|Light can travel through empty space.|fact|Sunlight reaches Earth across space, where there is almost no air.|Drops of water can bend light into a rainbow.||
Q|Sunlight reaches us by crossing|Empty space|A solid iron tube only|Your bones|A closed wooden box|0
Q|What can bend light into a rainbow?|Drops of water|A dry fossil|A dark closet with no light|The name of a magnet|0
friction|forces|Friction slows slides|Friction is a force that slows things that rub or slide.|fact|The same toy car rolls farther on a smooth floor than on rough carpet.|Friction also lets your shoes grip the ground.||
Q|Friction does what to sliding things?|It slows them|It erases gravity|It turns them into stars|It removes both poles|0
Q|A toy car rolls farther on|A smooth floor|Rough carpet|Thick mud|Sticky honey|0
lever|forces|A lever helps lift|A lever can help you lift a heavy load with a smaller push.|fact|A stiff bar on a fulcrum lets you lift a book with less push.|A seesaw is a lever.||
Q|A lever helps you|Lift a heavy load with a smaller push|Stop all friction forever|Boil water with no heat|Remove a magnet pole|0
Q|A seesaw is a kind of|Lever|Planet|Fossil|Germ|0
inertia|forces|Still stays still|A still object stays still until a force moves it.|fact|A puck on smooth ice keeps going until a rub or a hit changes its motion.|This rule is one of the motion rules Newton wrote.||newton
Q|A still book stays still until|A force moves it|It decides to fly|The Moon calls its name|It becomes DNA|0
Q|Who wrote rules for how forces move things?|Isaac Newton|Wangari Maathai|Tu Youyou|Mary Anning|0
hot-air|forces|Hot air rises|Hot air rises above cooler air.|fact|Warm air from a heater climbs, while cooler air sinks.|That is why a room can feel warmer upstairs.||
Q|What does hot air do?|It rises above cooler air|It always sinks under ice|It turns into rock|It loses both poles|0
Q|Why can upstairs feel warmer?|Warm air rises|Stairs make oxygen|Carpets boil|Magnets heat the roof|0
earth-sun|earth|Earth goes around the Sun|The Earth goes around the Sun.|fact|The way planets move, and pictures from space, fit a path around the Sun.|Long ago people tested this against the idea that everything circled Earth.||copernicus
Q|What does Earth go around?|The Sun|Only the Moon|A whale|A magnet|0
Q|Who wrote that Earth and the planets go around the Sun?|Nicolaus Copernicus|Jane Goodall|Alice Ball|Percy Julian|0
year-trip|earth|A year is one trip|A year is one trip of Earth around the Sun.|fact|We measure about 365 days from one season mark back to the same mark.|Some calendar years add a leap day so the count stays lined up.||
Q|A year is|One trip of Earth around the Sun|One blink|One tide|One spin of a toy top|0
Q|About how many days is one Earth trip around the Sun?|365|8|12|2|0
day-spin|earth|A day is a spin|A day is about one full spin of Earth.|fact|The Sun seems to cross the sky once each time Earth turns.|Places take turns facing the Sun, which makes day and night.||
Q|A day is about|One full spin of Earth|One trip around the galaxy|One frog winter|One bone|0
Q|Day and night happen because|Earth spins, so places take turns facing the Sun|The Sun goes out each night|The Moon covers the Sun every night|Earth stops moving|0
seasons|earth|Why seasons happen|Seasons happen because Earth is tilted as it goes around the Sun.|fact|The tilt changes how directly sunlight hits a place through the year.|Seasons are not caused by Earth getting much closer to the Sun.||
Q|What makes the seasons?|Earth's tilt|Earth getting much closer to the Sun|Magnets in shoes|Whale songs|0
Q|Which sentence is true?|Earth's tilt changes how directly sunlight hits us|Summer happens because the Moon boils|Winter means Earth left the solar system|Seasons are a kind of metal|0
earth-layers|earth|Earth has layers|Earth has a crust, a mantle, and a core.|fact|Earthquake waves change speed inside Earth, which shows the layers.|The crust is the thin outer layer we live on.||
Q|Which list names Earth layers?|Crust, mantle, core|Leaf, root, bee|Ice, oil, gold|North, south, copper|0
Q|How do we know Earth has layers?|Earthquake waves change speed inside it|Someone dug to the center|A guess with no test|Glass dripped down|0
fossils|earth|Fossils in rock|Fossils are remains or traces of living things kept in rock.|fact|People find bones, shells, and footprints turned to stone in rock layers.|Fossils are one way we know life has changed.||anning
Q|A fossil can be|A bone or footprint kept in rock|A living whale|A rain cloud|A magnet pole|0
Q|Who found famous fossil sea animals in cliffs in England?|Mary Anning|Katherine Johnson|Ada Lovelace|Chien-Shiung Wu|0
ocean-cover|earth|Ocean covers most|Ocean covers most of Earth.|fact|Maps and pictures from space show much more water than land.|About seven tenths of Earth's surface is ocean.||
Q|What covers most of Earth?|Ocean|Cities|Desert sand only|Ice only|0
Q|About how much of Earth's surface is ocean?|Seven-tenths|One-tenth|None|All of the Moon|0
volcano|earth|Volcanoes|A volcano can let melted rock come out of Earth.|fact|People have watched lava flow out and then cool into rock.|Not every mountain is a volcano.||
Q|What can come out of a volcano?|Melted rock|A finished element table|Moonlight|Liquid frogs|0
Q|Is every mountain a volcano?|No|Yes|Only on Tuesdays|Only if it has bones|0
quake|earth|Earthquakes|An earthquake happens when rock under our feet slips.|fact|Instruments record the shaking, and cracks in the ground show where rock moved.|The shaking can travel a long way through rock.||
Q|An earthquake starts when|Rock under our feet slips|A cloud tastes salt|A seed sprouts|Gold rusts|0
Q|What records the shaking of a quake?|Instruments|A cactus spine|A rainbow|A leap day|0
soil|earth|What soil is|Soil is broken rock mixed with air, water, and bits of living things.|fact|A hand lens shows grains, roots, and dark bits of old plants.|Worms and tiny living things help mix soil.||carver
Q|Soil is mostly|Broken rock plus air, water, and bits of life|Pure gold|Only ice|Only plastic|0
Q|Who studied crops that help tired soil?|George Washington Carver|Galileo Galilei|Isaac Newton|Ada Lovelace|0
tides|earth|The Moon and tides|The Moon's pull helps make ocean tides.|fact|Tide times line up with where the Moon is in the sky, over and over.|The Sun's pull plays a part too.||
Q|What helps make the tides?|The Moon's pull|A frog's heartbeat|Pencil graphite|A single bee|0
Q|Tide times line up with|The Moon|The color of gold|Your shoe size|A cactus|0
weather-climate|earth|Weather and climate|Weather is what the air does today, and climate is the pattern over many years.|fact|One rainy day is weather, while records kept for years show the climate.|A cold day does not erase a long warm pattern.||
Q|Weather is|What the air does today|The shape of DNA|A magnet pole|A fossil cliff|0
Q|Climate is|The pattern of weather over many years|One cloud|A single puddle|Today's lunch|0
sun-star|space|The Sun is a star|The Sun is a star.|fact|Its light and its makeup match other stars, only it is much closer.|Other stars look small because they are very far away.||
Q|The Sun is|A star|A cold rock|A whale|A fossil|0
Q|Why do other stars look tiny?|They are very far away|They are bacteria|They are underground|They have no light at all|0
eight-planets|space|Eight planets|Eight planets go around the Sun.|fact|Telescopes track eight big worlds on clear paths around the Sun.|Pluto is called a dwarf planet, not one of the eight.||
Q|How many planets go around the Sun?|Eight|Two|206|One million|0
Q|Pluto is|A dwarf planet|One of the eight planets|The biggest ocean|A kind of bone|0
moon-light|space|The Moon reflects|The Moon does not make its own light. It reflects the Sun.|fact|The bright part of the Moon always faces the Sun light.|The side in shadow looks dark.||
Q|The Moon's light comes from|The Sun bouncing off it|A fire inside the Moon|City lamps|Frogs on the Moon|0
Q|The dark part of the Moon is|The side in shadow|A hole with no rock|An ocean of ink|A magnet|0
moon-phases|space|Moon phases|The Moon looks different each night because we see different amounts of its sunny side.|fact|Draw the Moon for a month and the bright part grows and shrinks in order.|A full loop of phases takes about one month.||
Q|Why does the Moon shape seem to change?|We see different amounts of its sunny side|The Moon melts each night|Clouds eat it|It grows bones|0
Q|A full loop of Moon phases takes about|One month|One minute|Eight years|One second|0
saturn-rings|space|Saturn's rings|Saturn's rings are made mostly of chunks of ice and rock.|fact|Spacecraft and telescopes show vast crowds of chunks circling Saturn.|The rings are very wide, but they are also very thin.||
Q|Saturn's rings are mostly|Ice and rock|Tree leaves|Bone|Liquid gold oceans|0
Q|The rings are|Wide but very thin|One solid metal plate|A road you can walk|Made of whales|0
milky-way|space|The Milky Way|Our galaxy is called the Milky Way.|fact|We live inside it, and on a dark night its stars can look like a pale band.|A galaxy is a huge family of stars.||
Q|What is the name of our galaxy?|The Milky Way|The Red Sea|The Periodic Table|The Crust|0
Q|A galaxy is|A huge family of stars|One frog|A type of salt|A lever|0
rockets|space|Rockets push gas|A rocket moves forward by pushing gas backward.|fact|Let a balloon go and the air rushes out one way while the balloon zips the other way.|The same kind of push sends real rockets up.||newton
Q|A rocket goes forward by|Pushing gas backward|Pulling the stars with a rope|Dropping sand upward|Turning gravity off|0
Q|A balloon you let go zips because|Air rushes out the other way|It becomes ice|The Moon pulls the knot|Friction disappears forever|0
orbit-float|space|Floating in orbit|People in orbit float because they are falling around Earth, not because gravity is gone.|fact|The ship and the people fall together, so they feel weightless inside.|Gravity is still pulling. It bends their path around Earth.||
Q|Why do people in orbit float?|They are falling around Earth|Gravity has left space|The ship removes all mass|They are balloons|0
Q|Is gravity gone in orbit?|No|Yes|Only on Tuesdays|Only for plants|0
telescope|space|Telescopes gather light|A telescope gathers light so faint things look brighter.|fact|A big lens or mirror collects more light than your eye alone.|Galileo used a telescope to study the sky.||galileo
Q|A telescope helps us see faint things because it|Gathers more light|Makes sound louder|Melts sand|Counts bones|0
Q|Who used a telescope and saw moons around Jupiter?|Galileo Galilei|George Washington Carver|Tu Youyou|Barbara McClintock|0
universe-stretch|space|Space may stretch|Many far galaxies look redder, and a theory says space itself is stretching.|theory|That red shift lines up with distance for a huge number of galaxies.|This is a theory scientists keep testing, not a wild guess.||
Q|A theory about far galaxies says|Space is stretching|Frogs are planets|Glass is a slow liquid|Sound crosses empty space|0
Q|The redder light from far galaxies is|Evidence scientists keep testing|A guess nobody can test|Proof magnets have one pole|A tide|0
life-beyond|space|Life beyond Earth|The idea that living things exist beyond Earth is a guess until a test shows them.|guess|Spacecraft have checked some places, such as Mars, and have not found life there yet.|A guess can become a fact only after a test shows it.||
Q|Have we found living things beyond Earth?|Not yet|Yes, a city on the Sun|Yes, whales on the Moon|Yes, forests on Saturn rings|0
Q|The idea of life beyond Earth is|A guess until a test shows it|Already a measured fact|The same as H2O|One of Newton's laws of motion|0
heart|body|Your heart pumps|Your heart pumps blood around your body.|fact|You can feel the beat as a pulse, and scans can watch the heart squeeze.|The beat gets faster after you run.||
Q|What does your heart do?|It pumps blood|It makes sunlight|It stores rocks|It is a bar magnet|0
Q|When does your heart usually beat faster?|After you run|When you are a fossil|When you are made of glass|Never|0
lungs|body|Lungs and oxygen|Your lungs take in air so your blood can carry oxygen.|fact|Tests show that blood picks up oxygen in the lungs.|You breathe out carbon dioxide.||
Q|Lungs help your blood pick up|Oxygen|Sand|Iron rust|Only pollen|0
Q|You breathe out|Carbon dioxide|Liquid gold|Moon rocks|Magnets|0
bones|body|206 bones|A grown person's skeleton has 206 bones.|fact|Doctors count them on careful pictures and on skeletons in labs.|Babies have more bones, and some later join.||
Q|How many bones are in a grown person's skeleton?|206|8|2|3|0
Q|Babies have|More bones that can join later|No bones at all|A glass skull only|Bones made of honey|0
muscles|body|Muscles pull|Muscles pull on bones. They do not push.|fact|When your arm bends, a muscle gets shorter and pulls.|Another muscle pulls the other way to straighten the arm.||
Q|Muscles move bones by|Pulling|Pushing them like a pole|Melting them|Freezing them|0
Q|To straighten your arm|Another muscle pulls the other way|The same muscle pushes|The bone floats off|Gravity leaves|0
germs|body|Germs and hands|Some germs can cause illness, and washing hands with soap helps stop their spread.|fact|Tests show that soap and water lift germs off skin.|Soap and water work better than a quick rinse with water alone.||
Q|What helps stop germs from spreading on hands?|Washing with soap and water|Rubbing sand only|Skipping soap forever|Hiding hands in a fossil|0
Q|Which sentence is true?|Some germs can cause illness|All germs are rocks|Germs are planets|Soap is a planet|0
senses|body|Five senses|You can see, hear, smell, taste, and touch.|fact|Each of these senses uses its own body parts, such as eyes, ears, nose, tongue, and skin.|You also sense balance and heat.||
Q|Which list names five senses?|See, hear, smell, taste, touch|North, south, east, west, up|Solid, liquid, gas, rust, gold|Crust, mantle, core, tide, year|0
Q|Besides those five, you can also sense|Balance and heat|Radio shows with your knees|Sound in empty space|A magnet in every finger|0
enamel|body|Hard tooth coat|Teeth have a hard coat called enamel.|fact|Dentists see enamel as the tough cover, and it is harder than the inside of the tooth.|Sweet snacks and skipping the brush can hurt that coat.||
Q|The hard coat on a tooth is called|Enamel|A leaf|A ring of Saturn|Rust|0
Q|Enamel is|Harder than the inside of the tooth|A liquid metal|A kind of cloud|A moon|0
brain|body|Your brain|Your brain helps you think, feel, and move.|fact|Scans show parts of the brain working when you look, talk, or move.|You use many parts of your brain every day.||
Q|Your brain helps you|Think, feel, and move|Rust like iron|Orbit as a planet|Float like oil|0
Q|Which sentence is true?|You use many parts of your brain every day|People use only a tiny speck and the rest is off|The brain is a bone in the foot|The brain is made of window glass|0
skin|body|Skin is biggest|Skin is your body's biggest organ.|fact|Spread out, a grown person's skin covers more area than any other organ.|Skin helps keep water in and germs out.||
Q|Your biggest organ is|Skin|A single tooth|One hair|An eyelash|0
Q|Skin helps|Keep water in and germs out|Pump blood like a second heart|Make rings around Saturn|Boil water|0
sleep|body|Sleep helps|Sleep helps you remember and gives your body time to grow.|fact|Studies compare people after a full night of sleep and after too little sleep.|Children need more sleep than grown-ups.||
Q|Sleep helps you|Remember and grow|Turn into a magnet|Lose all your bones|Stop needing air|0
Q|Who needs more sleep?|Children|Rocks|Fossils|Gold coins|0
stomach|body|Stomach acid|Your stomach makes a strong acid that helps break down food.|fact|Doctors can measure that acid, and food changes after it sits in the stomach.|The stomach has a lining that stands up to its own acid.||
Q|The stomach makes|Acid that helps break down food|Sunlight|Rings of ice|A north pole|0
Q|Why can the stomach stand its own acid?|It has a tough lining|It is made only of diamond|It has no acid|It is empty space|0
helpful-germs|body|Some germs help|Some germs help us, like the ones that turn milk into yogurt.|fact|People grow those germs on purpose, and the milk thickens into yogurt.|Many helpful germs live in soil too.||
Q|Yogurt gets help from|Helpful germs|Liquid mercury|A telescope|An earthquake|0
Q|Are all germs harmful?|No|Yes|Only germs in space are real|Germs are not real|0
mercury|unusual|Liquid metal|A metal can be a liquid at room temperature, and that metal is mercury.|fact|In a sealed lab tube, mercury sits as a shiny liquid in an ordinary warm room.|Mercury is poisonous. It is for looking, not for touching.||
Q|Which metal is a liquid at room temperature?|Mercury|Iron|Wood|Ice|0
Q|What should you do with mercury?|Leave it sealed and do not touch it|Drink it|Put it on your skin|Stir it into food|0
wood-frog|unusual|A frog can freeze|Some wood frogs can freeze in winter, then thaw and hop.|fact|Scientists have watched these frogs freeze and later start moving again.|Their bodies make a sugary liquid that helps protect their cells.||
Q|What can some wood frogs do?|Freeze and later hop again|Turn into metal|Fly to Saturn|Stop being animals|0
Q|What helps protect a wood frog's cells?|A sugary liquid|A bar magnet|Hot lava|Dry sand only|0
octopus-hearts|unusual|Three hearts|An octopus has three hearts.|fact|Studies of octopuses show two hearts by the gills and one for the rest of the body.|When an octopus swims, the main heart can pause.||
Q|How many hearts does an octopus have?|Three|One|Eight|206|0
Q|Two of an octopus's hearts serve|The gills|The rings of Saturn|Glass making|North and south poles|0
banana-berry|unusual|A banana is a berry|A banana is a berry, and a strawberry is not.|fact|Plant scientists sort fruits by how the flower parts grow, not by the grocery name.|Tomatoes are berries too.||
Q|Which one is a berry in science?|A banana|A strawberry|A pine cone|A potato|0
Q|Scientists sort fruits by|How the flower parts grow|The color of the bag|How loud they are|How magnetic they are|0
butterfly-feet|unusual|Taste with feet|Butterflies taste with their feet.|fact|Sensors on their feet find sweet plant juice, and then the tongue uncurls.|The tongue is a long drinking tube.||
Q|Butterflies taste with their|Feet|Ears|Shadows|Elbows only|0
Q|A butterfly tongue is|A long tube|A magnet|A bone|A ring of ice|0
wombat-cubes|unusual|Cube droppings|A wombat's droppings are cube shaped.|fact|People have measured them, and studies of the intestine show how the cubes form.|Cubes do not roll away as easily as round pellets.||
Q|What shape are a wombat's droppings?|Cubes|Perfect spheres|Long swords|Rings|0
Q|What is special about cube-shaped droppings?|They do not roll away as easily|They turn into gold|They are magnets|They are stars|0
sharks-trees|unusual|Sharks before trees|Sharks were swimming before the first trees grew.|fact|Shark fossils in old rock sit below the first tree fossils.||We are not sure of the exact years.|
Q|Which came first?|Sharks swimming, then trees|Trees, then the first sharks much later|People, then sharks|Glass, then sharks|0
Q|Are we sure of the exact years for sharks and trees?|No. We are not sure.|Yes, to the minute|Yes, it was last Tuesday|We invent the dates|0
eiffel-heat|unusual|A tower grows|The Eiffel Tower stands a little taller on a hot day.|fact|Iron expands when it heats, and measurements of the tower show a small gain.|The change is a small stretch, not a whole extra floor.||
Q|On a hot day the Eiffel Tower|Stands a little taller|Turns into ice|Flies away|Loses all its iron|0
Q|Why can the tower grow a little?|Iron expands when it heats|Frogs push it up|The Moon pulls the top off|Sound piles on the tip|0
lizard-tail|unusual|A new tail|Some lizards can drop a tail and grow a new one.|fact|The tail can come off at a special spot, and a new one can grow.|The new tail is not exactly the same as the old one.||
Q|What can some lizards do?|Drop a tail and grow a new one|Turn into birds at once|Become mercury|Grow a glass head|0
Q|The new tail is|Not exactly the same as the old one|A telescope|Made only of diamond|A planet|0
venus-day|unusual|A long Venus day|One full spin of Venus takes longer than its trip around the Sun.|fact|Radar measures the slow spin, and the orbit time is shorter.|Venus also spins backward compared with Earth.||
Q|Which lasts longer on Venus?|One full spin|Its trip around the Sun|A human blink|A frog hop|0
Q|How do we measure the slow spin of Venus?|With radar|By tasting the air|With a magnet on a frog|By counting whale bones|0
`;

function parseFacts(src: string): Fact[] {
  const facts: Fact[] = [];
  let cur: Fact | null = null;
  for (const line of src.trim().split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("Q|")) {
      const parts = t.split("|");
      if (parts.length !== 7 || !cur) throw new Error(`Bad quiz line: ${t}`);
      const answer = Number(parts[6]);
      if (answer < 0 || answer > 3) throw new Error(`Bad answer: ${t}`);
      const q: Q = {
        prompt: parts[1] ?? "",
        choices: [parts[2] ?? "", parts[3] ?? "", parts[4] ?? "", parts[5] ?? ""],
        answer: answer as 0 | 1 | 2 | 3,
      };
      cur.quiz.push(q);
      continue;
    }
    const parts = t.split("|");
    if (parts.length !== 9) throw new Error(`Bad fact line (${parts.length}): ${t}`);
    const [slug, topic, title, sentence, kind, how, extra, unsure, person] = parts;
    cur = {
      slug: slug ?? "",
      topic: topic as TopicId,
      title: title ?? "",
      sentence: sentence ?? "",
      kind: kind as Kind,
      how: how ?? "",
      extra: extra || undefined,
      unsure: unsure || undefined,
      person: person || undefined,
      quiz: [],
    };
    facts.push(cur);
  }
  return facts;
}

export const FACTS: Fact[] = parseFacts(RAW);

export function getFact(slug: string): Fact | undefined {
  return FACTS.find((f) => f.slug === slug);
}

export function factsByTopic(topic: TopicId): Fact[] {
  return FACTS.filter((f) => f.topic === topic);
}
