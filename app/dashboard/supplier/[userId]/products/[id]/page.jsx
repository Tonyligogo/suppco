'use client';
import { useParams } from "next/navigation";
import ProductForm from "../ProductForm"
import { useProductDetail } from "@/hooks/(inventory)/useInventoryManagement";
import { Loader2 } from "lucide-react";

export default function ProductDetailsPage() {
    const params = useParams();
    const { data: product, isPending } = useProductDetail(params.id);
    if(isPending) return <Loader2 className="animate-spin"/>
  return (
    <ProductForm data={product} isEditingInitially={false} />
  )
}