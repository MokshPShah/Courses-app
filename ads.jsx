import { useState } from 'react';
import { Button } from './ui/button'; // adjust to your button path
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Loader2Icon } from 'lucide-react'; // or wherever you import it from

export default function AddItemForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        setFileUploaded(true);
      }, 2000); // replace this with your real upload logic
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='w-full max-w-md shadow-xl rounded-2xl flex flex-col gap-5 p-5 bg-gray-50'>
        <h2 className='text-2xl font-semibold pb-2 text-center'>Add New Item</h2>

        <div className='w-full'>
          <Label htmlFor='title' className='text-base'>
            Title<span className='text-red-500'>*</span>
          </Label>
          <Input type='text' id='title' placeholder='Enter title' />
        </div>

        <div className='w-full'>
          <Label htmlFor='desc' className='text-base'>
            Enter description<span className='text-red-500'>*</span>
          </Label>
          <Textarea id='desc' placeholder='Enter description' />
        </div>

        <div className='w-full'>
          <Label htmlFor='picture' className='text-base'>
            Upload Image<span className='text-red-500'>*</span>
          </Label>
          <Input id='picture' type='file' onChange={handleFileChange} />
        </div>

        {/* Conditional button display */}
        <div className="w-full flex justify-end">
          {isUploading ? (
            <Button size="sm" disabled>
              <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
              Please wait
            </Button>
          ) : fileUploaded ? (
            <Button variant="outline">Add Item</Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
