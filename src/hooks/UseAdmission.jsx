import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";

const UseColleges = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: colleges = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allColleges");
      return res.data;
    },
  });

  return [colleges, loading, refetch];
};

export default UseColleges;
