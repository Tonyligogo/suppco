import { useState } from "react";
import {
  Filter,
  MoreHorizontal,
  Search,
  SortAsc,
  SortDesc,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export function DataTable({
  data,
  columns,
  title,
  searchPlaceholder = "Search...",
  onRowAction,
  rowActions = [
    { label: "View Details", icon: Eye, action: "view" },
    { label: "Edit", icon: Edit, action: "edit" },
    { label: "Export", icon: Download, action: "export" },
    { label: "Delete", icon: Trash2, action: "delete", variant: "destructive" },
  ],
  renderDetailView,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnFilters, setColumnFilters] = useState({});

 // Filter and search data
 let filteredData = data.filter((row) => {
  const matchesSearch = columns.some((col) =>
    String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const matchesColumnFilters = Object.entries(columnFilters).every(([columnKey, filterValue]) => {
    if (!filterValue) return true;
    
    const column = columns.find(col => col.key === columnKey);
    const cellValue = row[columnKey];
    
    if (column?.filterType === 'number' && typeof filterValue === 'object') {
      const numValue = Number(cellValue);
      const { min, max } = filterValue;
      if (min !== undefined && numValue < Number(min)) return false;
      if (max !== undefined && numValue > Number(max)) return false;
      return true;
    } else if(column?.filterType === 'date' && typeof filterValue === 'object'){
      const dateValue = new Date(cellValue);
      const {min, max} = filterValue;
      if (min !== undefined && dateValue < new Date(min)) return false;
      if (max !== undefined && dateValue > new Date(max)) return false;
      return true;
    }
    else {
      return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
    }
  });
  
  return matchesSearch && matchesColumnFilters;
});

  // Sort data
  if (sortColumn) {
    filteredData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((_, index) => index)));
    }
  };

  const handleColumnFilter = (columnKey, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnKey]: value || undefined
    }));
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchTerm("");
  };

  return (
    <div>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-5">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {Object.keys(columnFilters).length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllFilters} className="gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          )}

          {selectedRows.size > 0 && (
            <Badge className="ml-auto bg-primary py-1 rounded-xl text-white">
              {selectedRows.size} selected
            </Badge>
          )}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className='bg-slate-100'>
              <TableRow className='border-0'>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredData.length > 0 && selectedRows.size === filteredData.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={column.key} className="font-semibold">
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0"
                          onClick={() => handleSort(column.key)}
                        >
                          {sortColumn === column.key ? (
                            sortDirection === "asc" ? (
                              <SortAsc className="h-4 w-4" />
                            ) : (
                              <SortDesc className="h-4 w-4" />
                            )
                          ) : (
                            <SortAsc className="h-4 w-4 opacity-50" />
                          )}
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
              {/* Filter Row */}
              <TableRow className="border-0">
                <TableHead className="p-2"></TableHead>
                {columns.map((column) => (
                  <TableHead key={`filter-${column.key}`} className="p-2">
                    {column.filterable && (
                      <>
                        {column.filterType === 'number' ? (
                          <div className="flex gap-1">
                            <Input
                              placeholder="Min"
                              type="number"
                              className="h-8 text-xs shadow-none"
                              value={columnFilters[column.key]?.min || ''}
                              onChange={(e) => handleColumnFilter(column.key, {
                                ...columnFilters[column.key],
                                min: e.target.value
                              })}
                            />
                            <Input
                              placeholder="Max"
                              type="number"
                              className="h-8 text-xs shadow-none"
                              value={columnFilters[column.key]?.max || ''}
                              onChange={(e) => handleColumnFilter(column.key, {
                                ...columnFilters[column.key],
                                max: e.target.value
                              })}
                            />
                          </div>
                        ) : 
                        column.filterType === 'date' ? 
                        (
                          <div className="flex gap-1">
                            <Input
                              placeholder="Min"
                              type="date"
                              className="h-8 text-xs shadow-none"
                              value={columnFilters[column.key]?.min || ''}
                              onChange={(e) => handleColumnFilter(column.key, {
                                ...columnFilters[column.key],
                                min: e.target.value
                              })}
                            />
                            <Input
                              placeholder="Max"
                              type="date"
                              className="h-8 text-xs shadow-none"
                              value={columnFilters[column.key]?.max || ''}
                              onChange={(e) => handleColumnFilter(column.key, {
                                ...columnFilters[column.key],
                                max: e.target.value
                              })}
                            />
                          </div>
                        )
                        :
                        (
                          <Input
                            placeholder={`Filter ${column.label.toLowerCase()}...`}
                            className="h-8 text-xs shadow-none"
                            value={columnFilters[column.key] || ''}
                            onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                          />
                        )}
                      </>
                    )}
                  </TableHead>
                ))}
                <TableHead className="p-2"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  className={`cursor-pointer transition-colors ${
                    selectedRows.has(index) ? "bg-muted/50" : "hover:bg-muted/30"
                  }`}
                  onClick={() => handleSelectRow(index)}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(index)}
                      onCheckedChange={() => handleSelectRow(index)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {renderDetailView && (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    setSelectedRow(row);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Details</DialogTitle>
                                  <DialogDescription>
                                    Detailed view of the selected item.
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRow && renderDetailView(selectedRow)}
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        {rowActions.map((action) => (
                          <DropdownMenuItem
                            key={action.action}
                            onSelect={() => onRowAction?.(action.action, row)}
                            className={action.variant === "destructive" ? "text-destructive" : ""}
                          >
                            <action.icon className="mr-2 h-4 w-4" />
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No data found matching your criteria.
          </div>
        )}
    </div>
  );
}