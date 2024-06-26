import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import DetailsSection from "./DetailsSection"
import { Separator } from "@/components/ui/separator"
import CuisinesSection from "./CuisinesSection"
import MenuSection from "./MenuSection"
import ImageSection from "./ImageSection"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { Restaurant } from "@/type"
import { useEffect } from "react"

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city name is required",
    }),
    country: z.string({
      required_error: "restaurant name is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string({
          required_error: "name is required",
        }),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imgUrl: z.string().optional(),
    productImg: z.instanceof(File, { message: "image is required" }),
  })
  .refine((data) => data.imgUrl || data.productImg, {
    message: "Either image Url or image file must be provided",
  })

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
  restaurant?: Restaurant
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  })

  useEffect(() => {
    if (restaurant) {
      const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2))
      const menuItemsFormatted = restaurant.menuItems.map((item) => ({
        ...item,
        price: parseInt((item.price / 100).toFixed(2)),
      }))
      const updatedRestaurant = {
        ...restaurant,
        deliveryPrice: deliveryPriceFormatted,
        menuItems: menuItemsFormatted,
      }
      form.reset(updatedRestaurant)
    }
  }, [form, restaurant])

  const onSubmit = (formDataJson: restaurantFormData) => {
    const formData = new FormData()
    formData.append("restaurantName", formDataJson.restaurantName)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
    formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine)
    })
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name)
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
    })
    if (formDataJson.productImg) {
      formData.append("productImg", formDataJson.productImg)
    }
    onSave(formData)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 px-0 md:p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </FormProvider>
  )
}

export default ManageRestaurantForm
