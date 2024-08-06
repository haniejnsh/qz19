// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { newContext } from "../contextQz";
import { useQuery,useMutation, useQueries, useQueryClient } from "@tanstack/react-query"
export default function Table() {
    const {}=useContext(newContext)
    const query=useQueryClient()
    const queryDel=useMutation({
        mutationFn: async(id)=>{
            const res=await axios.delete(`http://localhost:3000/contacts/${id}`)
            return res.data
        },
        onSuccess:()=>{
            query.invalidateQueries("perKey")
        }
    })
    const {
        isLoading: loading,
        data,
        isError,
        error,
        status,
        refetch,
      }= useQuery({
        queryKey:["perKey"],
        queryFn: async()=>{
            const res=await axios.get(`http://localhost:3000/contacts`)
            return res.data
        },
        retry:2
    })
  return (
    <div className="flex flex-col w-[200px] gap-4 items-center ">
        {
        loading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
        data.map(item => {
          return(
            <div className="bg-white px-2 py-6 rounded-2xl shadow-lg flex justify-around ">
              <div className="flex flex-col gap-2 text-md overflow-hidden">
                <p>
                  <span className="text-gray-500">Name</span>
                  <span className="px-1">:</span>
                  <span className="mr-1 font-bold text-gray-600">{item.name}</span>
                </p>
                
                <p>
                  <span className="text-gray-500">Price</span>
                  <span className="px-1">:</span>
                  <span className="font-bold text-gray-600">{item.price}</span>
                </p>
                
              </div>
              <div className="flex flex-col">
                <div onClick={()=>{queryDel.mutate(item.id)}} className="cursor-pointer mb-2"><i class="fa fa-trash text-xl text-red-700 hover:text-red-500" aria-hidden="true"></i></div>
                <div onClick={() => {console.log("edit",item.id)}}  className="cursor-pointer my-2 mt-4"><i class="fa fa-pencil text-xl text-green-700 hover:text-green-400" aria-hidden="true"></i></div>
              </div>
            </div>)
        }))
      }
    </div>
  )
}
