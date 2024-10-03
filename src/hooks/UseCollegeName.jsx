import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import useAxiosPublic from "./UseAxiosPublic";

const UseMyCollege = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    data: mycollege = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["mycollege"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `https://simple-admission-server.vercel.app/candidateInfoEmail?email=${user?.email}`
      );
      return res.data;
    },
  });

  return [mycollege, loading, refetch];
};

export default UseMyCollege;
