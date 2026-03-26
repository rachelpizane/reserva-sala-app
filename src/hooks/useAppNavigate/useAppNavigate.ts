import { useNavigate } from 'react-router-dom';
import { ROUTES } from "@/utils/constants/routes";

interface AppNavigate {
  toHome: () => void;
};

function useAppNavigate(): AppNavigate {
  const navigate = useNavigate()

  function toHome(): void {
    navigate(ROUTES.HOME);
  }

  return {
    toHome,
  };
}

export default useAppNavigate;
