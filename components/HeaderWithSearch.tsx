import React from 'react';
import { createStyles, Header, Autocomplete, Group, Burger, Text, AutocompleteItem } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Search } from 'tabler-icons-react';
import Transport from '../api/Transport';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

export function HeaderSearch({ links }: HeaderSearchProps , searchData: (string | AutocompleteItem)[] = []) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();
  Transport.HTTP.getAllNodes()
    .then((res: any) => {
      res.data.map((element: any) => {
        if (element.NodeTypeId === 1 || element.NodeTypeId === 2 || element.NodeTypeId === 6) {
            searchDataO.push(element.Name)
        }
    });
    })
    .catch((error) => console.log(error.message));
  var searchDataO = searchData.length > 0 ? searchData : ['Abdominal Pain', 'Abdominal symptoms', 'Abnormal thoughts/behavior', 'Abnormal Vaginal Bleeding']
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* <Burger opened={opened} onClick={() => toggleOpened()} size="sm" /> */}
          <Text size='xl' color={'blue'} weight={700}>EPHCG</Text>
          {/* <MantineLogo /> */}
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<Search size={16} />}
            data={searchDataO}
          />
        </Group>
      </div>
    </Header>
  );
}