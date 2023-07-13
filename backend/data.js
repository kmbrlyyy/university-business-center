import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@email.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Kimberley Delgado',
      email: 'kimberleydelgado@email.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'TUP Shirt',
      slug: 'tup-shirt',
      category: 'Shirt',
      image: '/images/p1.jpg',
      price: '120',
      countInStock: '10',
      description: 'Available in RED and WHITE.',
    },
    {
      // _id: '2',
      name: 'TUP Lanyard',
      slug: 'tup-lanyard',
      category: 'Lanyard',
      image: '/images/p2.jpg',
      price: '100',
      countInStock: '10',
      description: 'Reversible with Rubber Patch.',
    },
    {
      // _id: '3',
      name: 'TUP Bag',
      slug: 'tup-bag',
      category: 'Bag',
      image: '/images/p3.jpg',
      price: '120',
      countInStock: '10',
      description: 'Available in WHITE only.',
    },
    {
      // _id: '4',
      name: 'TUP Pin',
      slug: 'tup-pin',
      category: 'Pin',
      image: '/images/p4.jpg',
      price: '120',
      countInStock: '0',
      description: 'TUP College of Science Pin.',
    },
  ],
};

export default data;
