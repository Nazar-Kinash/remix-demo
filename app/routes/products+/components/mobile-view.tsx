import React from 'react';
import {formatRelative} from 'date-fns';
import {useTranslation} from 'react-i18next';

import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import {
  alpha,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Theme,
  Typography,
} from '@mui/material';

import {DeleteOutline} from '@mui/icons-material';
import {AppButton} from '~/global/components/app-button';

import {ApiProduct} from '~/api-client/types';


interface MobileViewProps {
  products?: ApiProduct[];
  doDeleteItem: (item: ApiProduct) => void;
}

const MobileView: React.FC<MobileViewProps> = ({products, doDeleteItem}) => {
  const {t} = useTranslation(['products', 'common']);

  if (!products?.length) return <Typography variant="h5">{t('products:noProducts')}</Typography>;

  return (
    <Grid container width="100%" spacing={2} alignItems="stretch">
      {products?.map(product => (
        <Grid key={product.createdAt} alignSelf="stretch" size={6}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              position: 'relative',
            }}
          >
            {product.isActive && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  zIndex: 10,
                  padding: '4px 8px',
                  borderRadius: '8px',
                  color: (theme: Theme) => theme.palette.success.main,
                  backgroundColor: (theme: Theme) => alpha(theme.palette.success.light, 0.7),
                }}
              >
                Active
              </Box>
            )}
            <CardMedia
              sx={{height: 140}}
              image={
                product.image ||
                'https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg'
              }
              title="green iguana"
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
              <Grid container spacing={2}>
                <Grid size={8}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title.en || product.title.ar}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Box padding="0 16px">
                    <Typography
                      sx={{
                        ...(product?.priceSale
                          ? {
                              color: (theme: Theme) => theme.palette.text.secondary,
                              textDecorationLine: 'line-through',
                              fontSize: '12px',
                            }
                          : {}),
                      }}
                    >
                      ${Number(product.price).toLocaleString() || '---'}
                    </Typography>
                    {product?.priceSale && (
                      <Typography variant="body1" fontWeight={700} color="error">
                        {'$' + Number(product.priceSale).toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Box flexGrow={1}>
                <Typography flexGrow={1} variant="caption" sx={{color: 'text.secondary'}}>
                  {product.description.en || product.description.ar}
                </Typography>
              </Box>
              <Divider orientation="horizontal" />
            </CardContent>
            <Box padding={'0 16px'}>
              <Typography variant="caption">
                {t('common:createdAt')}
                {': '}
                {formatRelative(new Date(product.createdAt), new Date())}
              </Typography>
              <Typography component="p" variant="caption" color="textDisabled">
                {t('common:updatedAt')}
                {': '}
                {product.updatedAt && product.updatedAt !== product.createdAt
                  ? formatRelative(new Date(product.updatedAt), new Date())
                  : '---'}
              </Typography>
              <Divider orientation="horizontal" />
            </Box>
            <CardActions>
              <Grid width={'100%'} container spacing={2}>
                <Grid size={8}>
                  <AppButton fullWidth to={`/products/${product.productId}`} variant="contained">
                    {t('common:edit')}
                  </AppButton>
                </Grid>
                <Grid size={4}>
                  <Button fullWidth variant="text" onClick={() => doDeleteItem(product)}>
                    <DeleteOutline />
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MobileView;
