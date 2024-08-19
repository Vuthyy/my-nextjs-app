import Image from "next/image"; // Import the Pagination Client Component
import { Pagination } from "../pagination/page";

const ITEMS_PER_PAGE = 8;

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const fetchPhotos = async (page: number) => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const allPhotos = await response.json();

  // Calculate total pages
  const totalPages = Math.ceil(allPhotos.length / ITEMS_PER_PAGE);

  // Get photos for the current page
  const photos = allPhotos.slice(start, end);

  return { photos, totalPages };
};

const PhotoPage: React.FC<{ searchParams: { page?: string } }> = async ({
  searchParams,
}) => {
  const page = parseInt(searchParams?.page || "1", 10);
  const { photos, totalPages } = await fetchPhotos(page);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 p-8">
        {photos.map((photo: Photo) => (
          <div
            key={photo.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <Image
                width={300}
                height={300}
                className="rounded-t-lg"
                src={photo.url}
                alt={photo.thumbnailUrl}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {photo.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default PhotoPage;
