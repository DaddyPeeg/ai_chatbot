import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from 'next/link'

export function AccordionComp() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Dropdown</AccordionTrigger>
        <AccordionContent>
          <Link href={''}>
            <p className="pl-8 py-2">Link 1</p>
          </Link>
          <Link href={''}>
            <p className="pl-8 py-2">Link 2</p>
          </Link>
          <Link href={''}>
            <p className="pl-8 py-2">Link 3</p>
          </Link>
          <Link href={''}>
            <p className="pl-8 py-2">Link 4</p>
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
