import React from "react";
import { useTranslation } from 'react-i18next';

function ItemsCounter(props) {
  const { t } = useTranslation();
  return <p data-testid="items-counter">{t('todo.itemsLeft', { count: props.amount })}</p>;
}

export default ItemsCounter;
