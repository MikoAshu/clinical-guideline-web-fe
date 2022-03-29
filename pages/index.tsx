import React from 'react';
import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core';
import { Notes, Frame, BabyCarriage, Man, Old } from 'tabler-icons-react';
import { Card, Image, Text, Badge, Button, ActionIcon, useMantineTheme } from '@mantine/core';
import { LinksGroup } from '../components/NavbarLinksGroup';
import { Logo } from '../components/logo';
import { UserButton } from '../components/UserButton';
import node from '../assets/Node.json';
import { HeaderSearch } from '../components/HeaderWithSearch';
import Transport from '../api/Transport';

var allSymptoms: {
  label: string;
  link: string;
}[] = [];
var adultSymptoms: {
  label: string;
  link: string;
}[] = [];
var childSymptoms: {
  label: string;
  link: string;
}[] = [];
var chronicCare: {
  label: string;
  link: string;
}[] = [];
var searchData: string[] = [];
const nodeData = [
  {
    label: 'All Symptoms',
    icon: Frame,
    initiallyOpened: false,
    links: allSymptoms
  },
  {
    label: 'Adult Symptoms',
    icon: Man,
    links: adultSymptoms
  },
  {
    label: 'Child Symptoms',
    icon: BabyCarriage,
    links: childSymptoms
  },
  {
    label: 'Chronic Care',
    icon: Old,
    links: chronicCare
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  Transport.HTTP.getAllNodes()
    .then((res: any) => {
      res.data.map((element: any) => {
        if (element.NodeTypeId === 1 || element.NodeTypeId === 2 || element.NodeTypeId === 6) {
            allSymptoms.push({
              label : element.Name,
              link: '/'
            })
            searchData.push(element.Name)

            if (element.NodeTypeId === 1){
              adultSymptoms.push({
                label : element.Name,
                link: '/'
              })
            } else if (element.NodeTypeId === 2) {
              childSymptoms.push({
                label : element.Name,
                link: '/'
              })
            } else {
              chronicCare.push({
                label : element.Name,
                link: '/'
              })
            }
        }
    });
    })
    .catch((error) => console.log(error.message));

  const links = nodeData.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <>
      <HeaderSearch links={[{ links: { link: '', label: '' } }]} searchData={searchData}></HeaderSearch>
      <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
        {/* <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Image src={'../assets/logo.png'} alt={'logo'} width={120} />
        </Group>
      </Navbar.Section> */}

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
