import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Michelle',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Blue Cut End Pocket Mop',
      system: 'Sealed Bucket (Pretreat) System',
      image: '/images/NFPM18BLEA.jpg',
      price: 5.67,
      msrp: 11.33,
      code: 'NFPM18BLEA',
      // rating: 4.5,
      dimension: '18"x15"x6',
      caseqty: 36,
      weight: 14,
      type: "Mops / Cloths / Pads", 
      countInStock: 20,     
      description: '18" Blue Pocket Mop color-coded Blue for General Purpose Cleaning. Constructed using corn rows for better cleaning and cut ends on fringe for better cleaning in corners. Launderable over 500 times. Features include: cut end pocket mops, bonded yarn, 4 center rows, durable blue H/D pocket back, and cut end Fringe.',
      dupsystem: ''
    },

    {
      name: 'Green Cut End Pocket Mop',
      system: 'Sealed Bucket (Pretreat) System',
      image: '/images/NFPM18GRE.jpg',
      price: 5.67,
      msrp: 11.33,
      code: 'NFPM18GREA',
      // rating: 4.5,
      dimension: '18"x15"x6',
      caseqty: 36,
      weight: 14,
      type: "Mops / Cloths / Pads", 
      countInStock: 20,     
      description: '18" Green Pocket Mop color-coded Green for cleaning in Food Service areas. Constructed using corn rows for better cleaning and cut ends on fringe for better cleaning in corners. Launderable over 500 times. Features include: cut end pocket mops, bonded yarn, 4 center rows, durable green H/D pocket back, and cut end Fringe.',
      dupsystem: ''
    },
  

    {
      name: 'Red Cut End Pocket Mop',
      system: 'Sealed Bucket (Pretreat) System',
      image: '/images/NFPM18RDEA.jpg',
      price: 5.67,
      msrp: 11.33,
      code: 'NFPM18RDEA',
      // rating: 4.5,
      dimension: '18"x15"x6',
      caseqty: 36,
      weight: 14,
      type: "Mops / Cloths / Pads", 
      countInStock: 20,     
      description: '18" Red Pocket Mop color-coded Red for cleaning in Critical Touch Point areas. Constructed using corn rows for better cleaning and cut ends on fringe for better cleaning in corners. Launderable over 500 times. Features include: cut end pocket mops, bonded yarn, 4 center rows, durable red H/D pocket back, and cut end Fringe.',
      dupsystem: '',
    },

    {
      name: 'Yellow Cut End Pocket Mop',
      system: 'Sealed Bucket (Pretreat) System',
      image: '/images/NFPM18YLEA.jpg',
      price: 5.67,
      msrp: 11.33,
      code: 'NFPM18YLEA',
      // rating: 4.5,
      dimension: '18"x15"x6',
      caseqty: 36,
      weight: 14,
      type: "Mops / Cloths / Pads", 
      countInStock: 20,     
      description: '18" Pocket Mop color-coded Yellow. Constructed using corn rows for better cleaning and cut ends on fringe for better cleaning in corners. Launderable over 500 times. Features include: cut end pocket mops, bonded yarn, 4 center rows, durable red H/D pocket back, and cut end Fringe.',
      dupsystem: '',
    },

    {
      name: 'Low Nap Blue Special Project Pocket Mop',
      system: 'Sealed Bucket (Pretreat) System',
      image: '/images/NFMF-PKT.jpg',
      price: 3.62,
      msrp: 7.25,
      code: 'NFMF-PKT',
      // rating: 4.5,
      dimension: '18"x15"x6',
      caseqty: 50,
      weight: 14,
      type: "Mops / Cloths / Pads", 
      countInStock: 20,     
      description: 'Economical low nap blue yarn pocket mop with gray pocket backing',
      dupsystem: '',
    },
    
  ],
};
export default data;
