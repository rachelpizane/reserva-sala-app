import BaseLayout from "@/components/common/base-layout/base-layout";
import NotFound from "@/pages/not-found/not-found";
import { ROUTES } from "@/utils/constants/routes";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<BaseLayout />}>
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}