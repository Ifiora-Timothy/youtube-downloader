import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pet,{ Pets } from "../lib/models/pet";
import { GetServerSideProps } from "next";

/* Retrieves pet(s) data from mongodb database */
export const getPets = async () => {
    await dbConnect();
  
    /* find all the data in our database */
    const result = await Pet.find({});
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const pets = result.map((doc) => {
      const pet:Pets = JSON.parse(JSON.stringify(doc));
      return pet
    });
  
    return {pets}
  };
  
type Props = {
  pets: Pets[];
};

const Index = async () => {
const {pets} = await getPets();

  return (
    <>
  
      {pets.map((pet) => (
        <div key={pet._id}>
          <div className="card">
            <img src={pet.image_url} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

              {/* Extra Pet Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href={{ pathname: "/[id]/edit", query: { id: pet._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: pet._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


export default Index;