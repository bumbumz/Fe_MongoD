import { useEffect } from 'react';
import { useBanners } from '../../hooks/useBanners';
import { useTheme } from '../../context/ThemeContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/Banner.module.css';

const Banner: React.FC = () => {
  const { banners, loading, error } = useBanners();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (banners.length > 0) {
      console.log('Banner data:', banners);
    }
  }, [banners]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Chuyển ảnh mỗi 3 giây
    adaptiveHeight: true,
  };

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (banners.length === 0)
    return <div className={styles.error}>Không có banner để hiển thị.</div>;

  return (
    <div
      className={`${styles.bannerContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
    >
      <Slider {...settings}>
        {banners.map(banner => (
          <div key={banner.id} className={styles.banner}>
            <img
              src={banner.thumbnailUrl || banner.link}
              alt={banner.name}
              className={styles.bannerImage}
              onError={e => {
                console.log(
                  `Failed to load image: ${banner.thumbnailUrl || banner.link}`,
                  e
                );
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/2560x984';
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
