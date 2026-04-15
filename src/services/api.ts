import { BASE_URL } from "@/utils/constants/api-config"
import axios from "axios"

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
