'use client';

import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import ImageGalleryItem from '../UI/ImageGalleryItem';
import { useMediaQuery } from '@mui/material';
import FsLightbox from 'fslightbox-react';
interface GalleryProps {
  gallery: {
    width?: number | null;
    height?: number | null;
    url?: string | null;
    fileName?: string | null;
  }[];
}

const Gallery = ({ gallery }: GalleryProps) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const imagesPerPage = isLargeScreen ? 6 : 8;
  const [totalImages, setTotalImages] = useState(0);
  const [open, setOpen] = useState({
    toggler: false,
    image: '',
  });

  const openLargeImage = (image: string) => {
    setOpen({ toggler: !open.toggler, image });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(totalImages / imagesPerPage);

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#F3FF99',
        contrastText: '#242105',
      },
    },
  });

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setTotalImages(gallery.length);
  }, [gallery]);

  const currentImages = gallery.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center w-full gap-5">
        <FsLightbox
          toggler={open.toggler}
          sources={
            currentImages.map((image) => image.url).filter((url) => url) as (
              | string
              | React.JSX.Element
            )[]
          }
          source={open.image}
        />
        {currentImages.map((image: any) => (
          <ImageGalleryItem
            onClick={() => openLargeImage(image.url)}
            key={image.fileName}
            image={image}
          />
        ))}
      </div>

      <ThemeProvider theme={customTheme}>
        <Pagination
          count={pages}
          page={currentPage}
          onChange={(_, page) => handlePaginate(page)}
          color="primary"
          className="text-main-white"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#F5F5F5',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#F3FF99',
              color: '#0C0C0C',
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default Gallery;
