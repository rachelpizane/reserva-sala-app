import { Toaster } from "sonner"

function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          "pointer-events-none data-[type=success]:!bg-green-500 !text-white data-[type=success]:!border-green-700 !rounded-sm !py-5 data-[type=error]:!bg-red-600 data-[type=error]:!border-red-800",
      }}
    />
  )
}

export default AppToaster
