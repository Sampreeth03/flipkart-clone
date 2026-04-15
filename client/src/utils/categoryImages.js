







const fashionImagesByName = {
  'Casual Shirts': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-glKPuvqqawZKGyoUNcWRtztebPWSVFr42QqMTmBMc-aMsrtQ0Z4ZX2k7ytC2'],
  'Denim Jeans': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQXFrar_kk_NlzPgtQ6JG659BGooSx-ckFTF15IjdqLTLBMokuWsbmbZdLklKlS'],
  'Women Kurta': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTsWQpOGy0velYOYzmDHD32yVoAKj_8Sp_lYfQcD6tSoHcXO56BTFtNkmWr0zZT'],
  'Sports Sneakers': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSK-2dCh-orYtEEUEbxRYp_6bBjR3p34bpScqzlLzGc5sGMht-Ob60axJGX7IZi'],
  'Classic Hoodie': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX2cACERMs9NIRkJ0h6b1pAhYWyAIhWFo0b0cY2iAG119kmDFB9qbket3P1Eyf'],
  'Summer Dress': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQkxHqgzqjY8po0_J7N1erJywyknh7ZMzaupx-T669bbctNdcn-P95eKnVqghKJ'],
  'Leather Belt': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROcY877qxB3jbWJBGlYUJQV_XCLBh-UuAxpIL9euDzz3-BnZ2flPZxJcxdhHDu'],
  'Cotton T-Shirts': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS9lpE3NST2azDUR1GuoDNJKmSRyCNcpd67NXKrzF-gGo_rIVr8nBSU3RCyNsA5'],
};

const mobilesImagesByName = {
  'Samsung Galaxy A55': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuJn6tIYfUhiVUUBeXFbHDXck8hbahjT2o692PCsAaC23w1OZEw4F3COMKt0BV'],
  'Redmi Note 13': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRhgUtFzBicyQ7Zp9t4lytgFftAMRKrPXmwccPrjHeZ5VuyzPNtmy6pwCakx5b4'],
  'iPhone 14': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRwWhDLWxqQAzo6W33vQGmssBgSBAQhrPEAK2G1IGzPwxmxdKQ7dScoNwTuG3Cr'],
  'Realme Narzo 70': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSg29G01yrNTu4LBF9Dx8QanVXlOt8c8DVpxu1Krz-qnd3L3UrCMZ5WM8MLTs_c'],
  'OnePlus Nord CE 4': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTYWvgIK8VkS0pUtWiF-x4Ua_FALqOcMeJXfs0RHgHDe99j9wDPTXRQ05CoL7Je'],
  'Moto G84': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSRYraPzcOuSn9GTe2Bzz5Kg48DtsmcRvNSEAMWuCsZM74M0xRJvPc7Newtweah'],
  'Vivo T3': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWiLJs-cGRfeaoF0BnLTWVqOzyk3eucZ6ciQLG0e1X8AL3H0PsYSo-_WHHY2C6'],
  'POCO X6': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEkobeJ6iQHp4bcSKUTPG6hdD4aQHJZ-HHFzmygLltJIz-l4rJuugB2ecEjAmR'],
};

const beautyImagesByName = {
  'Matte Lipstick': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYAZpXanugdw9uXi2NGG6OiUJRTM2lyeNAp3e45xyHYYuV8F28RV5BVeL0eqk'],
  'Herbal Face Wash': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIzOeZf3l9KrPaukMv4B_q7S7PRxYIrnYMgHfQ70XXY8yh_XXvFwM2wc5lRBfz'],
  'Vitamin C Serum': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpc_wFNSPOmG4nbU9OTNV7pAYKIyOhv1dytbuVxyI25wVeTxk8LLTiA51L2Ph-'],
  'Sunscreen SPF50': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVzWwBZ1O_sGxM6rOMCN4ZLfoMKfDDM5nivGC2sfRSpMn_L242pFVBx36u8vi'],
  'Kajal Pencil': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXFGA1F6mos5gWM_I7MtS6v_DXGX3LEOUCGYk9d2hm9iS94m4iMP8kTJZlIgst'],
  'Hair Dryer': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTNERoFGaarZe6T_Srni78NlbFXiosMjaZBBqrcW-xyMHCh7xrJM-bWAgrIsc3Y'],
  'Perfume Spray': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTKl9bI4t-Lwb_JDkR2cJkbWsVANzDMTomgzVtQGdDkbyzRLVu1j9RE2Jf6y17A'],
  'Moisturizer Cream': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzlFnOeT05LAMhfSN4pyUDERJSZieLZY7ffQMmpgTnhpU2ekVswf82hcSlQq-'],
};

const appliancesImagesByName = {
  'Mixer Grinder': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3nA3z8HJFqI5IAJJEVM14ybUzxWFM2VZeageDHonsKb3yZnZHX4HE5MDyOOX'],
  'Air Fryer': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDZ7uz54UYP4SVpxmCwtLnyvUmjkh1Cms8wWJbDgkPB0U2u-aYeDRfXFV-e36'],
  'Microwave Oven': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtrJgh7nWh0-inkJlgJFIKk7ZQLxJMw5nFcUny62mfVGP5T6An3X3WGCdctTG'],
  'Water Purifier': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmB5fH9u-lUxDBekuJe-uPPXKLmqKsGK1M1ssCUd5vMLMWCOvLccDFvVFHWsm'],
  'Vacuum Cleaner': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTW1KhW3HD9QmrcI5keWsL8wmikjtWPFeiG52BXJMWLxet5FmkbyBdoaW-wsBfw'],
  'Washing Machine': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFJwMiFJxW5fqcHlaLjZJxfbMlZY9LCPRcUnKvnG4gpc6kzRbVVGVh6cRTXwJU'],
  'Induction Cooktop': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYlXYSnD1fReOjyNfa8ByqOh7rQbfU7VGx1m_C9xPrL4CDAXEjWprQ57lDzWq1'],
  'Electric Kettle': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS0q4kkz4CgpZxMjXF_2eO8Q4uuLuKF7KfvmRsWNsDJiPHIi2Z378UrLSC-Mx69'],
};

const autoAccessoriesImagesByName = {
  'Car Vacuum': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWa95XddXRRbvStnm6TpJWTkMdTqJTsVkgrIGn1luEsms4K9oTwx8dr48HDie_'],
  'Bike Mobile Holder': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFO_EBxMXwy86C8ZcSWwNfeCSXSKyzF0BDLVC6v-NAKzUcwe-GEW_S3Iswk_A'],
  'Seat Cover Set': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkEWhsm7U8h0gmYpVyzT6LmpqudfLOZuBxui-SGYpi5P-UQPF0ue2aHmexh5Ie'],
  'Car Air Freshener': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhBtKikwrL6N5tYGqttemvhH0QjUh6JLWK5gZOG5LMlct17QxAmFFDy2vJwr0I'],
  'Car Charger': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSOUyAVkMgDtH_Pa9MOJUBGGlSwPMPjuvOJcf5AGTIHHCw0O2YC3yS7WeLbjyW'],
  Helmet: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvMW8eTY7C0eNUxMcF46PUfcLR4Q7xwnCZH4lGfjKAOCfEbD50jRolHsoS6qlE'],
  'Car Wax Polish': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRQkWtAkISvsvuILL5W4lzXCW1iSWlayWPdjwqh91XF0I4EUcD3fLtk1e9aIiyL'],
  'Tire Inflator': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQEuES-Ugdorn8OQGghLvW3mbXwG2Oixfvktycqcpuc6TJV429vrqocU9GegiO5'],
};

const electronicsImagesByName = {
  'Wireless Mouse': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTPjuHzmXoMRmh-9A2vUcH78wUHC0TZ5F9DB3J5OHPV5r09M2dZvrCzDoGe63Hq'],
  'Mechanical Keyboard': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSH2TPieVHfOlc8eqG8KZgze3DiOb2uNs2Caog_RBE7TILCB_p3wK65_kQpoMOn'],
  'Bluetooth Speaker': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRVunCx6DcRTNI6e_Lq7hQhYa7TEBwYhOVMm_Ty0Idxn4GLa2sgdsPrESvxovjs'],
  'Power Bank 20000mAh': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUdsTR2KyGXmDhdbSUboE3mGL3RcVQpsoMB83zx24RMWr9ZFxjNPrMPNmk3kb4'],
  'Smart LED Bulb': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8I4uZes5BAx4xl0X0fdyt1NVtwVzAK58y05N15FcVKoKE-zNpLD2Inf1uJlc4'],
  'WiFi Router': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJWRztKnHhwMmskew-ko19VTTcrbwSCMJWt4mVIEhJkLkZtvM-PklKrFQ-YGb'],
  'USB-C Hub': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRBLBxMsd0_UoY4QyrTt3xYCplPvuqW_DEOcSzinTRpqEQB2hiMM6mhKxWrNUn6'],
  'Noise Cancelling Earbuds': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwzZ01xdiEJKhSDnu2n6c1NKMuYKPljgbbE_TBlFFPPvrokThINWp_bnHM_XgP'],
};

const homeImagesByName = {
  'Bedsheet Set': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRur-kUpmAd_y-UuzEfPu2ZOLuUY97sWPzebbxrruQNMXQ71-GHNmgiFPgLxdH4'],
  'Wall Clock': ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4RbDKcvfx9CqgnNBuR8AV-DOsB6arRKy7Dw_q0c9kRVU66SIAprDIgpwsz6Cd'],
  'Kitchen Storage Box': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7asyNkMJHQcNWkndV6pSa6z6UCJffWGw439Qw2xgTPwjEFBewpfPzw5-0YVq'],
  'Floor Lamp': ['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQExU0GOPYl689pw0sRg4lMtcHJjM8Rrw21hPJQcxixCIkiOOhQhkV_O4Rrqqac'],
  'Curtain Set': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTlG1Sj2vqREa5AkXiai6PPWi7LddTRfnJPBCXOxUWtI3fBhQw_wMTN_qMbYDPc'],
  'Photo Frame': ['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRPww1Z7VA3R5x_Z3EoAq-N8Wo1l7YZp-BZCAy_O4x-XbngXTge8VZk5x1EoqxT'],
  'Cushion Covers': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBggpWkjDgWrXGd3rAcsmnTLwU9JD17fZN2MINKBda5uyg207n80bOEORVO2Xs'],
  'Aroma Diffuser': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNQpDfM9C9QZA7K9cg74n92rQugAZgbewr7MzUo7hDCpgN5RiOUVWkpWosUkhf'],
};

const toysImagesByName = {
  'Building Blocks': ['https://png.pngtree.com/png-vector/20241119/ourmid/pngtree-vibrant-stack-of-colorful-building-blocks-creating-a-pyramid-shape-isolated-png-image_14498929.png'],
  'Remote Car': ['https://i5.walmartimages.com/seo/Best-Choice-Products-1-24-Officially-Licensed-RC-Lamborghini-Veneno-Sport-Racing-Car-w-2-4GHz-Remote-Control-Red_44fe1f61-951c-4083-8ada-a08554e7168c.62901fadff4dc6b0b9254f7a907ff861.jpeg'],
  'Teddy Bear': ['https://i5.walmartimages.com/asr/39e2313b-614e-4bd5-b1e4-2e0c9fd6046c_1.c2f0b86d0850a4b8a2cd039efe2b5ab7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff'],
  'Puzzle Set': ['https://static.platform.michaels.com/2c-prd/327521926500112.jpg'],
  'Action Figure': ['http://www.maziply.com/cdn/shop/files/dc-studios-superman-movie-superman-12-inch-figure.jpg?v=1751494290'],
  'Board Game': ['https://m.media-amazon.com/images/I/81s1uoBIf0L._AC_SL1500_.jpg'],
  'Doll House': ['https://i.pinimg.com/736x/38/3d/d2/383dd2670a2a959e38255ca3a186673f--doll-houses-allt.jpg'],
  'Toy Train': ['https://i5.walmartimages.com/seo/Northlight-17-Piece-Battery-Operated-Lighted-Animated-Toy-Train-Set-with-Authentic-Train-Sound_a2d64ca1-6e64-445c-975e-d81b5649903c.36f6ed0b78d68aa450ab833f539bafa9.jpeg'],
};

const foodHealthImagesByName = {
  'Almonds 500g': ['https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D'],
  'Protein Powder': ['https://images.pexels.com/photos/13779108/pexels-photo-13779108.jpeg'],
  'Green Tea': ['https://images.unsplash.com/photo-1597066371673-2088a5c19802?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjB0ZWElMjBiYWd8ZW58MHx8MHx8fDA%3D'],
  'Honey 1kg': ['https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXklMjBqYXJ8ZW58MHx8MHx8fDA%3D'],
  'Multivitamin Tablets': ['https://images.pexels.com/photos/5149346/pexels-photo-5149346.jpeg'],
  'Peanut Butter': ['https://pixabay.com/images/download/x-8319100_1920.jpg'],
  'Oats 1kg': ['https://images.pexels.com/photos/6208145/pexels-photo-6208145.jpeg'],
  'Energy Bar Pack': ['https://plus.unsplash.com/premium_photo-1675538082227-e32babe2352a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VwcGxlbWVudCUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D'],
};

export const getCategoryImages = (product) => {
  if (!product) return [];

  const categoryName = product.category_name;
  if (categoryName === 'Fashion' || product.category_id === 1) {
    return fashionImagesByName[product.name] || [];
  }

  if (categoryName === 'Mobiles' || product.category_id === 2) {
    return mobilesImagesByName[product.name] || [];
  }

  if (categoryName === 'Beauty' || product.category_id === 3) {
    return beautyImagesByName[product.name] || [];
  }

  if (categoryName === 'Appliances' || product.category_id === 6) {
    return appliancesImagesByName[product.name] || [];
  }

  if (categoryName === 'Auto Accessories' || product.category_id === 9) {
    return autoAccessoriesImagesByName[product.name] || [];
  }

  if (categoryName === 'Electronics' || product.category_id === 4) {
    return electronicsImagesByName[product.name] || [];
  }

  if (categoryName === 'Home' || product.category_id === 5) {
    return homeImagesByName[product.name] || [];
  }

  if (categoryName === 'Toys' || product.category_id === 7) {
    return toysImagesByName[product.name] || [];
  }

  if (categoryName === 'Food & Health' || product.category_id === 8) {
    return foodHealthImagesByName[product.name] || [];
  }

  return [];
};
