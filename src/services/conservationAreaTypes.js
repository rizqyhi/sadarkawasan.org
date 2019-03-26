export default [
  {
    type: 'ksa',
    shortname: 'ca',
    name: 'Cagar Alam',
    description: 'Cagar Alam adalah KSA yang karena keadaan alamnya mempunyai kekhasan/keunikan jenis tumbuhan dan/atau keanekaragaman tumbuhan beserta gejala alam dan ekosistemnya yang memerlukan upaya perlindungan dan pelestarian agar keberadaan dan perkembangannya dapat berlangsung secara alami.',
    activities: [
      { type: 'do', name: 'Penelitian & pengembangan' },
      { type: 'do', name: 'Kegiatan menunjang budidaya' },
      { type: 'do', name: 'Ilmu pengetahuan & pendidikan' },
      { type: 'dont', name: 'WISATA' }
    ]
  },
  {
    type: 'ksa',
    shortname: 'sm',
    name: 'Suaka Margasatwa',
    description: 'Suaka Margasatwa adalah KSA yang mempunyai kekhasan/keunikan jenis satwa liar dan/atau keanekaragaman satwa liar yang untuk kelangsungan hidupnya memerlukan upaya perlindungan dan pembinaan terhadap populasi dan habitatnya.',
    activities: [
      { type: 'do', name: 'Penelitian & pengembangan' },
      { type: 'do', name: 'Kegiatan menunjang budidaya' },
      { type: 'do', name: 'Ilmu pengetahuan & pendidikan' },
      { type: 'limited', name: 'Wisata Terbatas' }
    ]
  },
  {
    type: 'kpa',
    shortname: 'tn',
    name: 'Taman Nasional',
    description: 'Taman Nasional adalah KPA yang mempunyai ekosistem asli, dikelola dengan sistem zonasi yang dimanfaatkan untuk tujuan penelitian, ilmu pengetahuan, pendidikan, menunjang budidaya, pariwisata, dan rekreasi.',
    activities: [
      { type: 'do', name: 'Penelitian & pengembangan' },
      { type: 'do', name: 'Kegiatan menunjang budidaya' },
      { type: 'do', name: 'Ilmu pengetahuan & pendidikan' },
      { type: 'do', name: 'Wisata', highlight: true }
    ]
  },
  {
    type: 'kpa',
    shortname: 'thr',
    name: 'Taman Hutan Raya',
    description: 'Taman Hutan Raya adalah KPA untuk tujuan koleksi tumbuhan dan/atau satwa yang alami atau bukan alami, jenis asli dan/atau bukan jenis asli, yang tidak invasif dan dimanfaatkan untuk kepentingan penelitian, ilmu pengetahuan, pendidikan, menunjang budidaya, budaya, pariwisata, dan rekreasi.',
    activities: [
      { type: 'do', name: 'Penelitian & pengembangan' },
      { type: 'do', name: 'Kegiatan menunjang budidaya' },
      { type: 'do', name: 'Ilmu pengetahuan & pendidikan' },
      { type: 'do', name: 'Wisata', highlight: true }
    ]
  },
  {
    type: 'kpa',
    shortname: 'twa',
    name: 'Taman Wisata Alam',
    description: 'Taman Wisata Alam adalah KPA yang dimanfaatkan terutama untuk kepentingan pariwisata alam dan rekreasi.',
    activities: [
      { type: 'do', name: 'Wisata', highlight: true },
      { type: 'do', name: 'Rekreasi alam', highlight: true }
    ]
  }
]
