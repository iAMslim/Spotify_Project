import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";

export default function LibraryBody() {
  const [{ token }, dispatch] = useStateProvider
  return <div>Library</div>;
}
