'use client';

import DynamicDialog from '@/components/custom/dynamic-dialog';
import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { useCompanyInfo } from '@/hooks/(company)/useCompanyManagement';
import { useCreateInventory, useInventory } from '@/hooks/(inventory)/useInventoryManagement'
import React, { useMemo, useState } from 'react'

const Inventory = () => {
    const {data:inventories} = useInventory()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {mutate:createInventory} = useCreateInventory();
    const { data: companyInfo } = useCompanyInfo();
    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    currentPage * rowsPerPage
  );
     const inventoryFields = [
    { 
      name: "name", 
      label: "Inventory type", 
      type: "text", 
      required:true,
      placeholder: "Enter inventory type",
    },
  ];
  const handleDataSubmit = (info) => {
    const data = {
      ...info,
      company: companyInfo?.name,
    }
    createInventory({data})
  }; 
  return (
    <div className='py-6 space-y-6'>
        <Header title='Inventory' description='Manage your inventory across all branches.'/>
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
      {paginatedData?.length > 0 ? 
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Layers</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.company}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.reference}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {item.layers?.length || 0}
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
      :
        <div className="text-center py-6 text-gray-500">
          No results found
        </div>
      }
      {/* Pagination */}
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
    </div>
    </div>
  )
}

export default Inventory