// check-schema.js

const { MongoClient } = require("mongodb");

// ✅ Replace with your MongoDB Atlas URI
const uri = "mongodb+srv://grandregalservices:qjzn97xUZx2RVfw2@cluster0.ln8wjyr.mongodb.net/?appName=Cluster0";

// ✅ Replace with your database name
const dbName = "grandRegalDb";

// ✅ Replace with your collection nam
  
  async function createCollectionWithSchema() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      createGalleryCollection(client.db("grandRegalDb"));
    } catch (err) {
      console.error("❌ Error:", err);
    }   
  }

  async function insertDummyBanquetMenu(db) {
    try {
      const dummyData = [
        {
          cat: "veg",
          details: [
            {
              cat: "Starters",
              thumb: "starters_thumb.jpg",
              items: ["Paneer Tikka", "Veg Spring Roll", "Hara Bhara Kabab"]
            },
            {
              cat: "Main Course",
              thumb: "maincourse_thumb.jpg",
              items: ["Dal Makhani", "Paneer Butter Masala", "Jeera Rice"]
            },
            {
              cat: "Desserts",
              thumb: "dessert_thumb.jpg",
              items: ["Gulab Jamun", "Ice Cream", "Rasgulla"]
            }
          ]
        },
        {
          cat: "non veg",
          details: [
            {
              cat: "Starters",
              thumb: "nonveg_starters.jpg",
              items: ["Chicken Lollipop", "Fish Finger", "Mutton Seekh Kabab"]
            },
            {
              cat: "Main Course",
              thumb: "nonveg_main.jpg",
              items: ["Butter Chicken", "Mutton Rogan Josh", "Egg Curry"]
            },
            {
              cat: "Desserts",
              thumb: "nonveg_dessert.jpg",
              items: ["Chocolate Mousse", "Fruit Salad", "Brownie"]
            }
          ]
        }
      ];
  
      const result = await db.collection("banquetMenu").insertMany(dummyData);
      console.log("✅ Dummy data inserted into 'banquetMenu':", result.insertedCount);
    } catch (err) {
      console.error("❌ Error inserting dummy data into 'banquetMenu':", err.message);
    }
  }

  async function insertVegMenuFromImage(db) {
    try {
      const vegMenuData = {
        cat: "veg",
        details: [
          {
            cat: "Mocktail",
            thumb: "mocktail_thumb.jpg",
            items: [
              "Sparkling Rose", "Litchi Delight", "Blue Lagoon", "Green Cooler"
            ]
          },
          {
            cat: "Soup",
            thumb: "soup_thumb.jpg",
            items: [
              "Tomato Soup", "Sweet Corn Soup", "Manchow Soup", "Hot & Sour Soup", "Clear Soup", "Lemon Coriander Soup"
            ]
          },
          {
            cat: "Salad",
            thumb: "salad_thumb.jpg",
            items: [
              "Green Salad", "Beans Sprout Salad", "Tossed Salad", "Russian Salad", "Coleslaw Salad"
            ]
          },
          {
            cat: "Raitas",
            thumb: "raitas_thumb.jpg",
            items: [
              "Boondi Raita", "Vegetable Raita", "Pineapple Raita", "Palak Raita", "Onion Raita"
            ]
          },
          {
            cat: "Veg Starters",
            thumb: "starters_thumb.jpg",
            items: [
              "Manchurian", "Paneer Manchurian", "Hara Bhara Kebab", "Spring Roll", "Papad Rool", "Paneer Schezwan Dry",
              "Paneer Chilly", "Corn Cheese Ball", "Crispy Potato", "Paneer Tikka", "Makai Rolls", "Paneer 65",
              "Paneer Peri – Peri"
            ]
          },
          {
            cat: "Veg Main Course",
            thumb: "maincourse_thumb.jpg",
            items: [
              "Veg Jaipuri", "Paneer Kadai", "Veg Tawa Masala", "Veg Handi", "Veg Amritsari", "Veg Jalfrezi",
              "Malai Methi Mutter", "Chole Kasturi", "Kashmiri Dum Aloo", "Punjabi Dum Aloo", "Rajasthani Bhendi",
              "Paneer Tikka Masala", "Paneer Palak", "Paneer Makhani", "Paneer Kurchan", "Veg Punjabi",
              "Veg Handi Dewani", "Veg Kolhapuri"
            ]
          },
          {
            cat: "Dal",
            thumb: "dal_thumb.jpg",
            items: ["Dal Fry", "Dal Tadka", "Dal Makhni"]
          },
          {
            cat: "Rice",
            thumb: "rice_thumb.jpg",
            items: ["Steam Rice", "Jeera Rice", "Veg Biryani", "Green Peas Pulav", "Veg. Pulav"]
          },
          {
            cat: "Roti",
            thumb: "roti_thumb.jpg",
            items: ["Roti", "Naan", "Paratha", "Kulcha"]
          },
          {
            cat: "Desserts",
            thumb: "dessert_thumb.jpg",
            items: [
              "Gulab Jamun", "Moong Dal Halwa", "Gajar Halwa (Seasonal)", "Kesar Phirni", "Strawberry Mousse",
              "Mango Ice Cream", "Vanilla Ice Cream", "Strawberry Ice Cream", "Chocolate Ice Cream"
            ]
          }
        ]
      };
  
      const result = await db.collection("banquetMenu").insertOne(vegMenuData);
      console.log("✅ Veg menu from image inserted into 'banquetMenu'. ID:", result.insertedId);
    } catch (err) {
      console.error("❌ Error inserting veg menu data:", err.message);
    }
  }
  
  async function insertNonVegMenuFromImage(db) {
    try {
      const nonVegMenuData = {
        cat: "nonveg",
        details: [
          {
            cat: "Mocktail",
            thumb: "mocktail_thumb.jpg",
            items: [
              "Sparkling Rose", "Litchi Delight", "Blue Lagoon", "Green Cooler"
            ]
          },
          {
            cat: "Soup",
            thumb: "soup_thumb.jpg",
            items: [
              "Tomato Soup", "Sweet Corn Soup", "Manchow Soup", "Hot & Sour Soup", "Clear Soup", "Lemon Coriander Soup"
            ]
          },
          {
            cat: "Salad",
            thumb: "salad_thumb.jpg",
            items: [
              "Green Salad", "Beans Sprout Salad", "Tossed Salad", "Russian Salad", "Coleslaw Salad"
            ]
          },
          {
            cat: "Raitas",
            thumb: "raitas_thumb.jpg",
            items: [
              "Boondi Raita", "Vegetable Raita", "Pineapple Raita", "Palak Raita", "Onion Raita"
            ]
          },
          {
            cat: "Non Veg Starter",
            thumb: "nonvegstarter_thumb.jpg",
            items: [
              "Chicken Boti Kebab", "Chicken Lollypop", "Chicken Crispy", "Chicken Banjara Kebab",
              "Chicken Reshmi Kebab", "Chicken Chilly", "Chicken Kolwada", "Chicken Tikka",
              "Chicken Pahadi Kebab", "Chicken Sheek Kebab", "Chicken in Garlic",
              "Chicken Schezwan Dry", "Chicken Peri – Peri"
            ]
          },
          {
            cat: "Non Veg Main Course",
            thumb: "nonvegmain_thumb.jpg",
            items: [
              "Chicken Handi", "Chicken Kolhapuri", "Chicken Lajawab", "Chicken Kadai",
              "Butter Chicken With Bone", "Mutton Maratha", "Mutton Kolhapuri", "Mutton Rogan Josh",
              "Mutton Masala"
            ]
          },
          {
            cat: "Dal",
            thumb: "dal_thumb.jpg",
            items: ["Dal Fry", "Dal Tadka", "Dal Makhni"]
          },
          {
            cat: "Rice",
            thumb: "rice_thumb.jpg",
            items: ["Steam Rice", "Jeera Rice", "Veg Biryani", "Green Peas Pulav", "Veg. Pulav"]
          },
          {
            cat: "Roti",
            thumb: "roti_thumb.jpg",
            items: ["Roti", "Naan", "Paratha", "Kulcha"]
          },
          {
            cat: "Desserts",
            thumb: "dessert_thumb.jpg",
            items: [
              "Gulab Jamun", "Moong Dal Halwa", "Gajar Halwa (Seasonal)", "Kesar Phirni",
              "Strawberry Mousse", "Mango Ice Cream", "Vanilla Ice Cream", "Strawberry Ice Cream",
              "Chocolate Mousse", "Chocolate Ice Cream"
            ]
          }
        ]
      };
  
      const result = await db.collection("banquetMenu").insertOne(nonVegMenuData);
      console.log("✅ Non-veg menu from image inserted into 'banquetMenu'. ID:", result.insertedId);
    } catch (err) {
      console.error("❌ Error inserting non-veg menu data:", err.message);
    }
  }
  
  
  async function createBanquetMenuCollection(db) {
    try {
      await db.createCollection("banquetMenu", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["cat", "details"],
            properties: {
              cat: {
                bsonType: "string",
                description: "Category of the banquet menu"
              },
              details: {
                bsonType: "array",
                description: "List of menu sections",
                items: {
                  bsonType: "object",
                  required: ["cat", "thumb", "items"],
                  properties: {
                    cat: {
                      bsonType: "string",
                      description: "Sub-category of items"
                    },
                    thumb: {
                      bsonType: "string",
                      description: "Thumbnail image"
                    },
                    items: {
                      bsonType: "array",
                      description: "List of item names",
                      items: {
                        bsonType: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
  
      console.log("✅ 'banquetMenu' collection created with validation.");
    } catch (err) {
      console.error("❌ Error creating 'banquetMenu' collection:", err.message);
    }
  }
  
  
  

  async function createDineMenuCollection(db) {
    try {
      const collectionName = "dineMenu";
  
      // Create collection with validation rules
      await db.createCollection(collectionName, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["img", "name", "desc", "price", "cat", "subCat", "shefSpecial", "isVeg"],
            properties: {
              img: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              name: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              desc: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              price: {
                bsonType: "int",
                description: "must be an integer and is required"
              },
              cat: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              subCat: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              shefSpecial: {
                bsonType: "bool",
                description: "must be a boolean and is required"
              },
              isVeg: {
                bsonType: "bool",
                description: "must be a boolean and is required"
              }
            }
          }
        }
      });
  
      console.log("✅ DineMenu collection created with schema validation!");
    } catch (error) {
      console.error("❌ Error creating collection:", error.message);
    }
  }

  async function insertDummyTarrifs(db) {
    try {
      const dummyData = [
        {
          cat: "veg",
          details: [
            {
              name: "Basic Veg",
              price: 500,
              items: [
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
              ]
            },
            {
              name: "Standard Veg",
              price: 700,
              items: [
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
              ]
            },
            {
              name: "Premium Veg",
              price: 1000,
              items: [
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
              ]
            }
          ]
        },
        {
          cat: "non veg",
          details: [
            {
              name: "Basic Non-Veg",
              price: 600,
              items: [
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
              ]
            },
            {
              name: "Standard Non-Veg",
              price: 850,
              items: [
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
              ]
            },
            {
              name: "Premium Non-Veg",
              price: 1200,
              items: [
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
                { logo: "logo1.png", name: "Paneer Tikka" },
              ]
            }
          ]
        }
      ];
  
      const result = await db.collection("tarrifs").insertMany(dummyData);
      console.log("✅ Dummy tarrifs inserted:", result.insertedCount, "documents");
    } catch (err) {
      console.error("❌ Error inserting dummy tarrifs:", err.message);
    }
  }
  
  
  

  async function createRoomsCollection(db) {
    try {
      const collectionName = "rooms";
  
      const schema = {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["name", "price", "briefInfo", "detailedInfo", "gallery", "ammenities", "rules", "extraFeatures", "broker"],
            properties: {
              name: { bsonType: "string" },
              price: { bsonType: "int"},
              briefInfo: { bsonType: "string" },
              detailedInfo: { bsonType: "string" },
              gallery: {
                bsonType: "array",
                items: { bsonType: "string" }
              },
              ammenities: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["name", "logo"],
                  properties: {
                    name: { bsonType: "string" },
                    logo: { bsonType: "string" }
                  }
                }
              },
              rules: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["name", "logo"],
                  properties: {
                    name: { bsonType: "string" },
                    logo: { bsonType: "string" }
                  }
                }
              },
              extraFeatures: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["logo", "name", "rate"],
                  properties: {
                    logo: { bsonType: "string" },
                    name: { bsonType: "string" },
                    rate: { bsonType: "int" }
                  }
                }
              },
              broker: { bsonType: "string" }
            }
          }
        }
      };
  
      // Create the collection
      await db.createCollection(collectionName, schema);
      
      console.log("✅ 'rooms' collection created successfully with validation rules.");
    } catch (err) {
      if (err.codeName === "NamespaceExists") {
        console.log("⚠️ Collection 'rooms' already exists.");
      } else {
        console.error("❌ Error creating 'rooms' collection:", err.message);
      }
    }
  }
  
  

  createCollectionWithSchema();


  async function insertRoomData(db) {
    try {
      const roomData = {
        name: "Deluxe Twin Bed Room",
        price: 2800,
        briefInfo: "A perfect blend of style and comfort with two cozy twin beds, modern amenities, and a serene ambiance for a relaxing stay",
        detailedInfo: `Deluxe Twin Bed Room offers a stylish stay with two comfortable twin beds and elegant interiors.
        Enjoy modern amenities like high-speed Wi-Fi, a smart TV, air conditioning, and a work desk.
        The room features a private bathroom with a rain shower and premium toiletries.
        Ideal for friends, colleagues, or solo travelers seeking space and comfort.
        A perfect blend of convenience and relaxation for a memorable stay`,
        gallery: [
          "https://res.cloudinary.com/de9mmhibr/image/upload/v1744556778/IMG-20250328-WA0006_lpy8vu.jpg",
          "https://res.cloudinary.com/de9mmhibr/image/upload/v1744556777/IMG-20250328-WA0004_hjrnkr.jpg",
          "https://res.cloudinary.com/de9mmhibr/image/upload/v1744556777/IMG-20250328-WA0005_elnu9n.jpg",
          "https://res.cloudinary.com/de9mmhibr/image/upload/v1744556777/IMG-20250328-WA0003_rf9lzz.jpg"
        ],
        ammenities: [
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607231/area_dmz2kf.png", name: "144 sq.ft" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607258/image-removebg-preview_ahxg9n.png", name: "City View" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/bed-removebg-preview_u7nx3d.png", name: "Twin Beds" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/wifi_1_mldc92.png", name: "Free Wifi" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/city-removebg-preview_dmpp9t.png", name: "City Center" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/city-removebg-preview_dmpp9t.png", name: "Road Touch" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/study_room_bixqib.png", name: "Study Room" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/room_services_tml6cf.png", name: "Room Service" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/air-conditioner_2_ou6ycj.png", name: "Air Conditioning" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/house_keeping_ynjdkq.png", name: "House Keeping" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/air_purifer_yevxr2.png", name: "Air Purifier" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/laundry_services_qhzvts.png", name: "Laundry Service" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/mineral_water_sgpwu3.png", name: "Mineral Water" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/bathroom__wqhht8.png", name: "Bathroom" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608852/image-removebg-preview_3_pwbxso.png", name: "Telephone" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608718/image-removebg-preview_2_h26zqy.png", name: "Closet" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/coffee_machine_pve7cg.png", name: "Coffee Machine" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Work_Desk_fg2ia1.png", name: "Work Desk" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Seating_area_loxvh9.png", name: "Seating Area" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Charging_points_bi34r4.png", name: "Charging Point" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608459/computer-icons-emergency-blankets-clip-art-portable-network-graphics-png-favpng-f9YxLbaTtQ0RwK4UmRHrkV7vK-removebg-preview_cgarxz.png", name: "Blankets" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608306/safe-30_vepuzu.png", name: "Safe" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Cupboards_with_lock_xwmrs1.png", name: "Lockers" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608718/image_uuvk6y-removebg-preview_dl3rmy.png", name: "TV" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604490/Toiletries_htz64n.png", name: "Toiletries" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Shaving_Mirror_wx5ygt.png", name: "Shaving Mirror" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Western_toilet_gp5z5i.png", name: "Western Toilets" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604487/Towels_dpudbe.png", name: "Towels" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604489/Slippers_lhy20x.png", name: "Slippers" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604490/Toiletries_htz64n.png", name: "Dental Kit" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/Hot_and_Cold_Water_gem2ch.png", name: "Hot & Cold Water" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604488/Kettle_p2atwl.png", name: "Kettle" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744604486/Celling_Fan_sulqjy.png", name: "Ceiling Fans" }
      ],
        rules: [
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744609101/pngtree-vector-business-man-icon-png-image_925673-removebg-preview_cdzbka.png", name: "Primary Guest Should Be 18 Years of Age" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744608969/684833_ftmosf.png", name: "Aadhar is Requires as ID proof" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744609130/image-removebg-preview_5_s5s7q6.png", name: "Pets Not Allowed" },
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744609129/image-removebg-preview_4_b9onvs.png", name: "Outside Food Not allowed" }
        ],
        extraFeatures: [
          { logo: "https://res.cloudinary.com/de9mmhibr/image/upload/v1744607259/bed-removebg-preview_u7nx3d.png", name: "Extra bed", rate: 0 }
        ],
        broker: "https://www.makemytrip.com/hotels/grand_regal-details-uran_islampur.html"
      };
  
      const result = await db.collection("rooms").insertOne(roomData);
      console.log("✅ Room data inserted successfully with _id:", result.insertedId);
    } catch (error) {
      console.error("❌ Failed to insert room data:");
      if (error.name === "MongoNetworkError") {
        console.error("🔌 Network error. Make sure MongoDB is running.");
      } else if (error.code === 11000) {
        console.error("⚠️ Duplicate key error. This room might already exist.");
      } else {
        console.error("🧨 Error message:", error.message);
        console.error("🧩 Stack trace:", error.stack);
      }
    }
  }

  async function createRoomBookingsCollection(db) {
    try {
      const collectionName = "room_bookings";
  
      const schema = {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "roomName", "name", "checkIn", "checkOut", 
              "checkInT", "checkOutT", "mobile",  "finalCost", 'status'
            ],
            properties: {
              roomName: { bsonType: "string" },
              name: { bsonType: "string" },
              guestName: {
                bsonType: ["array", "null"],
                items: {
                  bsonType: "object",
                  required: ["name", "isChild"],
                  properties: {
                    name: { bsonType: "string" },
                    isChild: { bsonType: "bool" }
                  }
                }
              },
              status: {
                bsonType: 'string',
                enum: ['pending', 'accepted', 'declined']
              },
              checkIn: { bsonType: "date" },
              checkOut: { bsonType: "date" },
              checkInT: { bsonType: "string" },
              checkOutT: { bsonType: "string" },
              mobile: { bsonType: "string" },
              email: { bsonType: ["string", "null"], description: "optional field" },
              services: {
                bsonType: ["array", "null"],
                items: { bsonType: "string" }
              },
              msg: { bsonType: ["string", "null"] },
              finalCost: { bsonType: "int" }
            }
          }
        }
      };
  
      await db.createCollection(collectionName, schema);
      console.log("✅ 'room_bookings' collection created successfully with validation.");
    } catch (err) {
      if (err.codeName === "NamespaceExists") {
        console.log("⚠️ Collection 'room_bookings' already exists.");
      } else {
        console.error("❌ Error creating 'room_bookings' collection:", err.message);
      }
    }
  }
  
  async function createGalleryCollection(db) {
    try {
      const collectionName = "gallery";
  
      const schema = {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "cat", "imgs"
            ],
            properties: {
              cat: { bsonType: "string" },
              services: {
                bsonType: ["array"],
                items: { bsonType: "string" }
              }
            }
          }
        }
      };
  
      await db.createCollection(collectionName, schema);
      console.log("✅ 'Gallery' collection created successfully with validation.");
    } catch (err) {
      if (err.codeName === "NamespaceExists") {
        console.log("⚠️ Collection 'room_bookings' already exists.");
      } else {
        console.error("❌ Error creating 'room_bookings' collection:", err.message);
      }
    }
  }
  

  async function createBanquetsCollection(db) {
    try {
      const collectionName = "banquets";
  
      const schema = {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["overview", "features", "price", "gallery", "minGuestCount", "extraFeatures"],
            properties: {
              overview: { bsonType: "string" },
              features: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["logo", "name"],
                  properties: {
                    logo: { bsonType: "string" },
                    name: { bsonType: "string" }
                  }
                }
              },
              price: { bsonType: "int" },
              gallery: {
                bsonType: "array",
                items: { bsonType: "string" }
              },
              minGuestCount: { bsonType: "int" },
              extraFeatures: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["logo", "name", "rate"],
                  properties: {
                    logo: { bsonType: "string" },
                    name: { bsonType: "string" },
                    rate: { bsonType: "int" }
                  }
                }
              }
            }
          }
        }
      };
  
      await db.createCollection(collectionName, schema);
      console.log("✅ 'banquets' collection created successfully.");
    } catch (err) {
      if (err.codeName === "NamespaceExists") {
        console.log("⚠️ Collection 'banquets' already exists.");
      } else {
        console.error("❌ Error creating 'banquets' collection:", err.message);
      }
    }
  }
  

  async function insertDummyBanquet(db) {
    try {
      const dummyBanquet = {
        overview: "Spacious banquet hall perfect for weddings, parties, and conferences.",
        features: [
          { logo: "https://example.com/logos/ac.png", name: "Air Conditioning" },
          { logo: "https://example.com/logos/parking.png", name: "Ample Parking" },
          { logo: "https://example.com/logos/stage.png", name: "Decorated Stage" }
        ],
        price: 50000,
        gallery: [
          "https://example.com/gallery/img1.jpg",
          "https://example.com/gallery/img2.jpg",
          "https://example.com/gallery/img3.jpg"
        ],
        minGuestCount: 50,
        extraFeatures: [
          { logo: "https://example.com/logos/dj.png", name: "DJ Service", rate: 7000 },
          { logo: "https://example.com/logos/lighting.png", name: "Special Lighting", rate: 3000 },
          { logo: "https://example.com/logos/catering.png", name: "Catering", rate: 20000 }
        ]
      };
  
      const result = await db.collection("banquets").insertOne(dummyBanquet);
      console.log("✅ Dummy banquet inserted with ID:", result.insertedId);
    } catch (err) {
      console.error("❌ Error inserting dummy banquet:", err.message);
    }
  }
  
  async function createTarrifsCollection(db) {
    try {
      await db.createCollection("tarrifs", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["cat", "details"],
            properties: {
              cat: {
                bsonType: "string",
                enum: ["veg", "non veg"],
                description: "Must be 'veg' or 'non veg'"
              },
              details: {
                bsonType: "array",
                description: "Array of tariff plans",
                items: {
                  bsonType: "object",
                  required: ["name", "price", "items"],
                  properties: {
                    name: {
                      bsonType: "string",
                      description: "Name of the plan"
                    },
                    price: {
                      bsonType: "int",
                      description: "Price of the plan"
                    },
                    items: {
                      bsonType: "array",
                      description: "Array of items",
                      items: {
                        bsonType: "object",
                        required: ["logo", "name"],
                        properties: {
                          logo: {
                            bsonType: "string",
                            description: "URL of the item logo"
                          },
                          name: {
                            bsonType: "string",
                            description: "Name of the item"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
  
      console.log("✅ Tarrifs collection created successfully.");
    } catch (err) {
      console.error("❌ Error creating tarrifs collection:", err.message);
    }
  }

  async function createBanquetBookingsCollection(db) {
    try {
      await db.createCollection('banquetBookings', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'fname', 'lname', 'mobile', 'email', 'date', 'time', 'duration', 'tarrif', 'plan', 'guestCount', 'cost', 'costShown', 'status'],
            properties: {
              name: { bsonType: 'string' },
              fname: { bsonType: 'string' },
              lname: { bsonType: 'string' },
              mobile: { bsonType: 'string' },
              email: { bsonType: 'string' },
              date: { bsonType: 'date' },
              time: { bsonType: 'string' }, // e.g., "18:00"
              duration: { bsonType: 'int' },
              cost: { bsonType: 'int'},
              costShown: { bsonType: 'int'},
              tarrif: {
                bsonType: 'string',
                enum: ['veg', 'nonveg']
              },
              status: {
                bsonType: 'string',
                enum: ['pending', 'accepted', 'declined']
              },
              plan: { bsonType: 'string' },
              guestCount: { bsonType: 'int' },
              additional: {
                bsonType: 'array',
                items: { bsonType: 'string' }
              }
            }
          }
        }
      });
  
      console.log('banquetBookings collection created successfully.');
    } catch (err) {
      if (err.codeName === 'NamespaceExists') {
        console.log('Collection banquetBookings already exists.');
      } else {
        console.error('Error creating collection:', err);
      }
    }
  }

  async function createEnquiriesCollection(db) {
    try {
      await db.createCollection('enquiries', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['fname', 'lname', 'email', 'mobile', 'reason', 'message', 'status'],
            properties: {
              fname: { bsonType: 'string' },
              lname: { bsonType: 'string' },
              email: { bsonType: 'string' },
              mobile: { bsonType: 'string' },  // Assuming this is a field name. If not, rename it appropriately.
              reason: { bsonType: 'string' },
              message: { bsonType: 'string' },
              status: {
                bsonType: 'string',
                enum: ['unread', 'replied', 'read']
              }
            }
          }
        }
      });
  
      console.log('enquiries collection created successfully.');
    } catch (err) {
      if (err.codeName === 'NamespaceExists') {
        console.log('Collection enquiries already exists.');
      } else {
        console.error('Error creating enquiries collection:', err);
      }
    }
  }
  
  
  
  
  