"use client";

import DynamicDialog from "@/components/custom/dynamic-dialog";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { useCompanyInfo } from "@/hooks/(company)/useCompanyManagement";
import {
  useCreateInventory,
  useInventory,
} from "@/hooks/(inventory)/useInventoryManagement";
import { Pencil } from "lucide-react";
import React, { useMemo, useState } from "react";
import { EditInventoryDialog } from "./components/EditInventoryDialog";

const Inventory = () => {
  const { data: inventories } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createInventory } = useCreateInventory();
  const { data: companyInfo } = useCompanyInfo();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const [editItem, setEditItem] = useState(null)
  console.log(inventories)
  const rowsPerPage = 5;
  // Filtered Data
  const filteredData = useMemo(() => {
    return inventories?.filter((item) => {
      const searchTerm = search.toLowerCase();
      return (
        item.company?.toLowerCase().includes(searchTerm) ||
        item.name?.toLowerCase().includes(searchTerm) ||
        item.reference?.toLowerCase().includes(searchTerm)
      );
    });
  }, [inventories, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const inventoryFields = [
    {
      name: "name",
      label: "Inventory type",
      type: "text",
      required: true,
      placeholder: "e.g. Shell equipment",
    },
  ];
  const handleDataSubmit = (info) => {
    const data = {
      ...info,
      company: companyInfo?.name,
    };
    createInventory({ data });
  };
  return (
    <div className="py-6 space-y-6">
      <Header
        title="Inventory"
        description="Manage your inventory across all branches."
      />
      <DynamicDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Create Inventory"
        description="Fill in the details below to create a new inventory."
        fields={inventoryFields}
        onSubmit={handleDataSubmit}
        submitText="Create Inventory"
      />

      <div className="w-full">
        {/* Search */}
        <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          <Button onClick={() => setIsModalOpen(true)}>Add Inventory</Button>
        </div>

        {/* Table */}
        {paginatedData?.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Layers</th>
                  <th className="px-4 py-3 w-16">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.company}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.reference}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.layers?.length || 0}</td>
                    <td className="px-4 py-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditItem(item)}
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </td>

                  </tr>
                ))}

                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border p-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <svg
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No inventory found
            </h3>
            <p className="mt-2 mb-6 max-w-xs text-sm text-gray-500">
              We couldn't find what you're looking for. Try adjusting your
              filters or adding a new inventory.
            </p>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear filters
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>
                Add Inventory
              </Button>
            </div>
          </div>
        )}
        {/* Pagination */}
        {paginatedData?.length > 0 ? 
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        :
        null
        }
      </div>
      <EditInventoryDialog
        item={editItem}
        open={editItem !== null}
        onClose={() => setEditItem(null)}
      />
    </div>
  );
};

export default Inventory;
