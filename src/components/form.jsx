import { Field, Form, Formik } from "formik"

import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { newContext } from "../contextQz";

export default function FormQz() {
    // const {data}=useContext(newContext)
    const queryClient = useQueryClient();
    const postMutate = useMutation({
        mutationFn: async (d) => {
          const res = await axios.post("http://localhost:3000/contacts", d);
          return res.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries("perKey");
        },
    })
    
    return (
        <Formik
          initialValues={{ name: "", price: "" }}
          onSubmit={(values) => {
            console.log("values",values);
            postMutate.mutate({id:(Math.floor(Math.random() * 100))*(Date.now()),name:values.name,price:values.price})
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is Required------")
              .max(20, "Name should be less than 20 characters")
              .lowercase("should be lowercase")
              .strict(),
            price: Yup.number(),
          })}
        >
          {({ errors }) => (
            <Form className="flex flex-col gap-1 px-2 py-2 mb-8 ">
              <label>Name</label>
              <Field id="name" name="name" />
              <span style={{ color: "red" }}>{errors.name}</span>
             
              <label>Price</label>
              <Field id="price" name="price" type="password" />
              <span style={{ color: "red" }}>{errors.price}</span>
              
              <button type="submit" className="bg-blue-300 rounded-xl w-32">Create New</button>
            </Form>
          )}
        </Formik>
      );
    
    
}
