import { showTemplateStory, getDefaultMetadata } from '../../../../../.storybook/helper'
import VirtualTable from '../VirtualTable'
import { columns, data } from './VirtualTable.stories_data'

export default getDefaultMetadata(VirtualTable, 'Components/ui/VirtualTable', {}, true)

const props = {
  data,
  columns,
  defaultSortBy: 'mts',
  defaultSortDirection: 'ASC',
}

export const basic = showTemplateStory(VirtualTable, props)
