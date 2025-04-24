// src/components/About.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import config from '../config/index.json';

// 101 herb facts
const ALL_FACTS: string[] = [
  'Basil was first cultivated in India over 5,000 years ago.',
  "Rosemary is named from the Latin 'ros marinus' meaning 'dew of the sea'.",
  'Thyme was used by ancient Egyptians for embalming.',
  "Oregano gets its name from Greek words meaning 'joy of the mountain'.",
  'Mint is known to soothe an upset stomach and aid digestion.',
  'Parsley is high in vitamins A, C, and K.',
  'Cilantro and coriander come from the same plant: cilantro leaves and coriander seeds.',
  'Lavender is used to calm nerves and improve sleep quality.',
  "Sage was once believed to increase longevity; its name comes from the Latin for 'to heal'.",
  'Dill seeds have been found in ancient Egyptian tombs.',
  'Chives belong to the onion family but have a mild, garlicky flavor.',
  'Tarragon pairs famously with chicken and fish dishes.',
  'Marjoram is closely related to oregano but has a sweeter, milder taste.',
  'Lemongrass is used extensively in Southeast Asian cuisine and teas.',
  'Fennel has been used since Roman times as a breath freshener.',
  'Bay leaves come from the bay laurel tree, sacred to ancient Greeks.',
  'Chamomile tea is often used as a gentle sleep aid.',
  'Angelica root was once chewed to relieve intestinal gas.',
  'Bergamot peel gives Earl Grey tea its distinctive citrus flavor.',
  'Cardamom is one of the most expensive spices by weight, after saffron and vanilla.',
  'Caraway seeds flavor rye bread and are digestive aids.',
  'Catnip can induce a playful response in cats but has a calming effect on humans.',
  'Cayenne pepper is a variety of chili pepper that boosts metabolism.',
  'Cloves contain eugenol, used as a natural anesthetic in dentistry.',
  'Curry leaves are central to South Indian cooking and medicinal remedies.',
  'Fenugreek seeds have a maple-syrup-like aroma when cooked.',
  'Galangal is a relative of ginger with a sharper, citrusy taste.',
  'Ginger is one of the oldest known spices, used for over 5,000 years.',
  'Horseradish contains allyl isothiocyanate, giving its pungent heat.',
  'Juniper berries are the main flavoring in gin.',
  'Kaffir lime leaves are a staple in many Thai dishes.',
  'Lovage tastes like celery but stronger, often used in soups.',
  'Mustard seeds can be yellow, brown, or black, each with distinct heat levels.',
  'Nutmeg and mace both come from the same seed; nutmeg is the kernel, mace is the surrounding aril.',
  'Paprika is made from ground, dried sweet or hot red peppers.',
  'Peppermint is a hybrid of watermint and spearmint.',
  'Rue has been used as an insect repellent and headache remedy.',
  'Sumac provides a tangy, lemony flavor in Middle Eastern cuisine.',
  'Turmeric contains curcumin, noted for anti-inflammatory properties.',
  'Vanilla is the only edible fruit of the orchid family.',
  'Wasabi must be freshly grated; store-bought is often colored horseradish.',
  'White sage is used in smudging rituals by Native American tribes.',
  'Yarrow has been used as a natural styptic to stop bleeding.',
  'Zedoary, also called white turmeric, is used in Indonesian cuisine.',
  'Ajwain seeds taste like thyme and aid indigestion.',
  'Aniseed has a licorice-like flavor and aids digestion.',
  "Asafoetida is known as 'devil's dung' due to its pungent smell but mellows when cooked.",
  'Borage flowers are edible and taste like cucumber.',
  'Bee balm attracts pollinators and is used in teas and jellies.',
  'Black cumin, also called nigella seeds, are used in Middle Eastern breads.',
  'Blue vervain is used for its calming properties in herbal teas.',
  'Carob is a caffeine-free substitute for chocolate.',
  'Citronella oil is derived from lemongrass and repels mosquitoes.',
  "Costmary was once called 'Bible leaf' and used to decorate hymnals.",
  'Culantro is different from cilantro; it has a stronger flavor.',
  'Elderflower is used to make cordial and flavor desserts.',
  'Epazote is used in Mexican cooking to reduce gas in beans.',
  'Eucalyptus leaves are used in cough drops and inhalants.',
  'Galbanum resin was prized in ancient incense blends.',
  'Goldenseal is known for its antimicrobial properties.',
  'Grains of Paradise are West African seeds with peppery flavor.',
  'Hyssop is mentioned in biblical texts for purification rituals.',
  'Kalonji seeds are used in Indian and Middle Eastern cuisines.',
  'Kava root is used for its relaxing, sedative effects in Pacific Island cultures.',
  "Lady's mantle leaves were used in medieval herbal medicine for menstrual cramps.",
  'Lovage seeds have diuretic properties and flavor soups.',
  'Mexican tarragon, or winter tarragon, is milder than French tarragon.',
  'Mullein leaves have been smoked to relieve respiratory issues.',
  'Nettle leaves, when cooked, are rich in iron and vitamins.',
  'Parsley was used as a breath freshener by ancient Greeks.',
  'Pennyroyal oil is toxic in large doses and should be used with caution.',
  'Perilla leaves are used in Korean cuisine and contain omega-3 fatty acids.',
  'Rue was considered protective against witchcraft in medieval Europe.',
  "Saffron comes from the stigmas of Crocus sativus and is the world's most expensive spice.",
  'Savory is called the ‘herb of contests’ for its role in love potions.',
  'Shiso leaves are popular in Japanese cuisine for their aromatic flavor.',
  'Skirret is an ancient sweet root once eaten by Romans.',
  'Stinging nettle fiber can be spun into fabric similar to hemp.',
  'Sweet woodruff was used to flavor May wine in Germany.',
  'Tansy was used as a food preservative before refrigeration.',
  'Thai basil has a licorice-like scent distinct from sweet basil.',
  'Wintergreen leaves contain methyl salicylate, similar to aspirin.',
  'Wormwood is the key flavoring herb in absinthe.',
  'Zeodary, native to India, is used medicinally for digestive issues.',
  'Zizyphus jujube fruit is used in traditional Chinese medicine.',
  'Most herbs reach peak flavor just before they bloom.',
  'Freezing fresh herbs can preserve their flavor during winter.',
  'Dried herbs are generally more potent than fresh by weight.',
  'Infusing herbs in oil can extend their shelf life and flavor.',
  'Herbal sachets have been used to scent linens for centuries.',
  'Companion planting uses herbs to deter pests in vegetable gardens.',
  'Growing herbs attracts beneficial pollinators to your garden.',
  'Many herbs contain antioxidants that support overall health.',
  'Herb gardens date back to ancient Mesopotamia and Egypt.',
  'Glass cloches were historically used to protect delicate herbs.',
  'Herbal vinegars are made by steeping herbs in wine vinegar.',
  'Herbal salves utilize plant oils and beeswax for topical application.',
  'Steeping herbs above boiling water is called infusion.',
  'Decoctions involve boiling tougher herbs like roots and bark.',
  'Herbal bitters aid digestion when taken before meals.',
  'Fresh cut herbs release essential oils that perfume the air.',
  'Harvest herbs in the morning after dew has dried for best flavor.',
  'Rotate herb crops yearly to prevent soil-borne diseases.',
  'Herbal hydrosols are fragrant waters produced during steam distillation.',
  'Native Americans used many local herbs for food and medicine.',
  'The Victorian era saw herbalism revived through botanical gardens.',
  'Thomas Jefferson cultivated a 54-foot-long herb garden at Monticello.',
  'Culinary and medicinal herbs often overlap in use.',
  'Some herbs, like basil, are sensitive to cold and must be replanted annually.',
  'Tender young herb shoots can be harvested multiple times per season.',
  'Herbaceous perennials return year after year in mild climates.',
];

const PAGE_SIZE = 10;

const About: React.FC = () => {
  const { about } = config;
  const [showFacts, setShowFacts] = useState(false);
  const [visibleFacts, setVisibleFacts] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const loadMore = useCallback(() => {
    const next = page + 1;
    setVisibleFacts(prev => [
      ...prev,
      ...ALL_FACTS.slice(page * PAGE_SIZE, next * PAGE_SIZE),
    ]);
    setPage(next);
  }, [page]);

  const onScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      visibleFacts.length < ALL_FACTS.length
    ) {
      loadMore();
    }
  }, [visibleFacts.length, loadMore]);

  useEffect(() => {
    if (showFacts && page === 0) {
      loadMore();
    }
  }, [showFacts, page, loadMore]);

  useEffect(() => {
    if (!showFacts) return;
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showFacts, onScroll]);

  const timeline = [
    { year: '2024', text: 'Idea born' },
    { year: '2025', text: 'Launched' },
    { year: '2026', text: '1,000 customers' },
    { year: '2027', text: '10,000 customers' },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-background text-gray-800 py-16 px-6 md:px-20"
    >
      {/* Our Story & Mission */}
      {about.sections.map((sec, i) => (
        <div key={i} className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-2">{sec.name}</h2>
          <p className="text-gray-600">{sec.content}</p>
        </div>
      ))}

      {/* Timeline */}
      <h2 className="text-3xl font-bold text-herbgreen text-center mb-8">Our Journey</h2>
      <div className="flex justify-center items-start gap-12 flex-wrap mb-16">
        {timeline.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-20 h-20 bg-herbgreen text-white flex items-center justify-center rounded-full text-xl font-bold mb-3 shadow-soft">
              {item.year}
            </div>
            <p className="text-center w-40 text-sm text-herbgray">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* 101 Facts Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-soft">
        <h2 className="text-2xl font-bold text-herbgreen text-center mb-4">101 Facts About Herbs</h2>
        <p className="text-center text-gray-600 mb-6">Discover fun and surprising tidbits about your favorite herbs—from ancient remedies to modern culinary hacks.</p>

        {!showFacts ? (
          <div className="text-center">
            <button
              onClick={() => setShowFacts(true)}
              className="bg-primary hover:bg-herbgreenLight text-white px-6 py-3 rounded-lg transition"
            >
              Read the 101 Facts
            </button>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {visibleFacts.map((fact, i) => (
              <motion.p
                key={i}
                className="p-4 bg-background rounded-lg shadow-soft text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                {fact}
              </motion.p>
            ))}
            {visibleFacts.length < ALL_FACTS.length && (
              <p className="text-center text-gray-500 mt-4">Scroll down to load more…</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
