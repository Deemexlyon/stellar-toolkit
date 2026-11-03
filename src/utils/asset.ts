import { Asset } from 'stellar-sdk';
import { CustomAsset } from '../types';

export function createAsset(assetInfo: 'native' | CustomAsset): Asset {
  if (assetInfo === 'native') {
    return Asset.native();
  }
  return new Asset(assetInfo.code, assetInfo.issuer);
}

export function isNativeAsset(asset: 'native' | CustomAsset): asset is 'native' {
  return asset === 'native';
}

export function formatAssetString(asset: 'native' | CustomAsset): string {
  if (asset === 'native') {
    return 'XLM';
  }
  return `${asset.code}:${asset.issuer.substring(0, 4)}...`;
}
