import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import {
  ObjectFieldItemTableRow,
  StyledObjectFieldTableRow,
} from '@/settings/objects/components/ObjectFieldItemTableRow';
import {
  activeFieldItems,
  activeObjectItems,
  disabledFieldItems,
} from '@/settings/objects/constants/mockObjects';
import { objectSettingsWidth } from '@/settings/objects/constants/objectSettings';
import { AppPath } from '@/types/AppPath';
import { IconPlus, IconSettings } from '@/ui/display/icon';
import { H2Title } from '@/ui/display/typography/components/H2Title';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Table } from '@/ui/layout/table/components/Table';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableSection } from '@/ui/layout/table/components/TableSection';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: ${({ theme }) => theme.spacing(8)};
  width: ${objectSettingsWidth};
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const StyledAddFieldButton = styled(Button)`
  align-self: flex-end;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsObjectDetail = () => {
  const navigate = useNavigate();
  const { pluralObjectName = '' } = useParams();
  const activeObject = activeObjectItems.find(
    (activeObject) => activeObject.name.toLowerCase() === pluralObjectName,
  );

  useEffect(() => {
    if (!activeObject) navigate(AppPath.NotFound);
  }, [activeObject, navigate]);

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <StyledContainer>
        <StyledBreadcrumb
          links={[
            { children: 'Objects', href: '/settings/objects' },
            { children: activeObject?.name ?? '' },
          ]}
        />
        <H2Title
          title="Fields"
          description={`Customise the fields available in the ${activeObject?.singularName} views and their display order in the ${activeObject?.singularName} detail view and menus.`}
        />
        <Table>
          <StyledObjectFieldTableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Field type</TableHeader>
            <TableHeader>Data type</TableHeader>
            <TableHeader></TableHeader>
          </StyledObjectFieldTableRow>
          <TableSection title="Active">
            {activeFieldItems.map((fieldItem) => (
              <ObjectFieldItemTableRow
                key={fieldItem.name}
                fieldItem={fieldItem}
              />
            ))}
          </TableSection>
          {!!disabledFieldItems.length && (
            <TableSection isInitiallyExpanded={false} title="Disabled">
              {disabledFieldItems.map((fieldItem) => (
                <ObjectFieldItemTableRow
                  key={fieldItem.name}
                  fieldItem={fieldItem}
                />
              ))}
            </TableSection>
          )}
        </Table>
        <StyledAddFieldButton
          Icon={IconPlus}
          title="Add Field"
          size="small"
          variant="secondary"
        />
      </StyledContainer>
    </SubMenuTopBarContainer>
  );
};