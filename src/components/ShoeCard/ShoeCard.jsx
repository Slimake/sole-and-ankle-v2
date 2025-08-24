import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLES = {
    'on-sale': {
      position: 'absolute',
      background: `${COLORS.primary}`,
    },
    'new-release': {
      position: 'absolute',
      background: `${COLORS.secondary}`,
    },
    default: {
      display: 'none',
    }
  }; 

  const styles = STYLES[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Variant style={styles}>{variant}</Variant>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice salePrice={salePrice}>{formatPrice(salePrice)}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 280px;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Variant = styled.span`
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  border-radius: 4px;
  padding: 8px;
  text-transform: capitalize;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${COLORS.gray[700]};
  text-decoration: ${(props) => props.variant === 'on-sale' ? 'line-through' : 'initial'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: ${(props) => typeof props.salePrice === 'number' ? 'initial' : 'none'};
`;

export default ShoeCard;
