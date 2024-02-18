"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";



const areaCodes = [
  { label: "United States", value: "+1US" },
  { label: "India", value: "+91IN" },
  { label: "China", value: "+86CH" },
] as const;

const countries = [
  { label: "United States", value: "unitedstates" },
  { label: "India", value: "india" },
  { label: "China", value: "china" },
] as const;

const cuisines = [
  {
    id: "italian",
    label: "Italian Cuisine",
  },
  {
    id: "mexican",
    label: "Mexican Cuisine",
  },
  {
    id: "japanese",
    label: "Japanese Cuisine",
  },
  {
    id: "chinese",
    label: "Chinese Cuisine",
  },
  {
    id: "indian",
    label: "Indian Cuisine",
  },
  {
    id: "french",
    label: "French Cuisine",
  },
  {
    id: "mediterranean",
    label: "Mediterranean Cuisine",
  },
  {
    id: "thai",
    label: "Thai Cuisine",
  },
  {
    id: "american",
    label: "American Cuisine",
  },
  {
    id: "spanish",
    label: "Spanish Cuisine",
  },
  {
    id: "greek",
    label: "Greek Cuisine",
  },
  {
    id: "korean",
    label: "Korean Cuisine",
  },
  {
    id: "vietnamese",
    label: "Vietnamese Cuisine",
  },
  {
    id: "brazilian",
    label: "Brazilian Cuisine",
  },
  {
    id: "caribbean",
    label: "Caribbean Cuisine",
  },
  {
    id: "middleEastern",
    label: "Middle Eastern Cuisine",
  },
  {
    id: "african",
    label: "African Cuisine",
  },
  {
    id: "fusion",
    label: "Fusion Cuisine",
  },
  {
    id: "vegetarian",
    label: "Vegetarian Cuisine",
  },
  {
    id: "vegan",
    label: "Vegan Cuisine",
  },
  {
    id: "glutenFree",
    label: "Gluten-Free Cuisine",
  },
  {
    id: "other",
    label: "Other",
  },
] as const;



const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z.string().max(1000, {
    message: "Description can contain a maximum of 1000 characters.",
  }).min(10, {
    message: "Description must be at least 10 characters.",
  }),
  email: z.string().email("Please enter a valid e-mail address."),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string({
    required_error: "Please enter a city.",
  }),
  zipCode: z.string({
    required_error: "Please enter a zip code.",
  }),
  areaCode: z.string({
    required_error: "Please enter a zip code.",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be 10 characters.",
    })
    .max(10, {
      message: "Phone number must be 10 characters.",
    }),
  cuisines: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one category.",
  }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
        type: z.string()
      })
    )
    .optional(),
  address: z.string({
    required_error: "Please enter an address.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  name: "",   
  description: "",
  email: "",
  zipCode: "",
  areaCode: "+1US",
    city: "",
    country: "",
    phoneNumber: "",
    cuisines: ["other"],
    urls: [
    { value: "", type: "website" },
    { value: "", type: "linkedin" },
    { value: "", type: "instagram" },
    { value: "", type: "twitter"},
    { value: "",  type: "facebook"},
    { value: "", type: "youtube" },
    { value: "", type: "tiktok" },
  ],
  address: "",
};


export function SignupYourRestaurantForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  async function onSubmit(data: AccountFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });

      console.log(res)

      createRestaurant({...data, pictureUrl: res.url })

    }
  }

  const createRestaurant = useMutation(api.restaurants.createRestaurant)
  

  return (
    <Form {...form}>
      <div className="flex items-center justify-center">
        {file && <Image src={URL.createObjectURL(file)} alt="uploading_image" width={400} height={400} className="rounded-lg bg-cover overflow-hidden"/>}
      </div>
     <Input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your restaurant name" {...field} />
              </FormControl>
              <FormDescription>
                This is the first name that will be displayed on your restaurant profile and in
                emails
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your restaurant email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be displayed on your restaurant email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Your restaurant address" {...field} />
              </FormControl>
              <FormDescription>
                This is the address that will be displayed on your restaurant profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map(({ label, value }) => (
                    <SelectItem value={label} key={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
              This is the country that will be displayed on your restaurant profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* city name */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Your city name" {...field} />
              </FormControl>
              <FormDescription>
                This is the zip code that will be displayed on your restaurant profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* zip code */}
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="Your zip code" {...field} />
              </FormControl>
              <FormDescription>
                This is the zip code that will be displayed on your restaurant profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* area code */}
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-2">
            <FormField
              control={form.control}
              name="areaCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Code</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="+1US" {...field}/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {areaCodes.map(({ label, value }) => (
                            <SelectItem value={label} key={value}>{value}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* phone number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your zip code" {...field} className="m-0"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            This phone number will displayed on your restaurant profile
          </FormDescription>
        </div>

        <Separator />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your restaurant"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the description that will be displayed on your restaurant profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* Category */}
        <FormField
          control={form.control}
          name="cuisines"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Cuisines</FormLabel>
                <FormDescription>
                  Select the cuisines offered by your restaurant
                </FormDescription>
              </div>
              {cuisines.map(item => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="cuisines"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    value => value !== item.id
                                  )
                                );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* urls */}
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} placeholder="www.example.com"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
