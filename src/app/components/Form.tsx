"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Error {
  username?: string;
  email?: string;
  password?: string;
}

type Props = {
  formId: string;
  petForm: FormData;
  forNewPet?: boolean;
};

const Form = ({ formId, petForm, forNewPet = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: petForm.name,
    owner_name: petForm.owner_name,
    species: petForm.species,
    age: petForm.age,
    poddy_trained: petForm.poddy_trained,
    diet: petForm.diet,
    image_url: petForm.image_url,
    likes: petForm.likes,
    dislikes: petForm.dislikes,
  });



  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add pet");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {};
    if (!form.name) err.name = "Name is required";
    if (!form.owner_name) err.owner_name = "Owner is required";
    if (!form.species) err.species = "Species is required";
    if (!form.image_url) err.image_url = "Image URL is required";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewPet ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form
        id={formId}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto h-400 border border-purple-500 rounded-md p-4 flex flex-col justify-between"
      >
        <div className="mb-4 flex">
          <label htmlFor="name" className="mb-2">Name</label>
          <input
            type="text"
            maxLength={20}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex=">
          <label htmlFor="owner_name" className="mb-2">Owner</label>
          <input
            type="text"
            maxLength={20}
            name="owner_name"
            value={form.owner_name}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="species" className="mb-2">Species</label>
          <input
            type="text"
            maxLength={30}
            name="species"
            value={form.species}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="age" className="mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="poddy_trained" className="mb-2">
            <input
              type="checkbox"
              name="poddy_trained"
              checked={form.poddy_trained}
              onChange={handleChange}
              className="mr-2"
            />
            Potty Trained
          </label>
        </div>

        <div className="mb-4 flex">
          <label htmlFor="diet" className="mb-2">Diet</label>
          <textarea
            name="diet"
            maxLength={60}
            value={form.diet}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="image_url" className="mb-2">Image URL</label>
          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="likes" className="mb-2">Likes</label>
          <textarea
            name="likes"
            maxLength={60}
            value={form.likes}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="dislikes" className="mb-2">Dislikes</label>
          <textarea
            name="dislikes"
            maxLength={60}
            value={form.dislikes}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;