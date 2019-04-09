import React, { useState } from 'react'
import { Card as AragonCard } from '@aragon/ui'
import { DragHandle, Wrap } from "./styled"
import Show from "./Show"
import Edit from "./Edit"

export default function Card({ id, title, body, editing: editingProp, remove, update, moveUp }) {
  const [editing, rawSetEditing] = useState(editingProp || false)
  const [wasEdited, setWasEdited] = useState(false)
  const [wasMoved, setWasMoved] = useState(false)

  const setEditing = val => {
    if (val) {
      rawSetEditing(true)
    } else {
      rawSetEditing(false)
      setWasEdited(true)
      setWasMoved(false)
    }
  }

  return (
    <AragonCard data-id={id} height="initial" width="initial">
      <Wrap>
        {editing
          ? <React.Fragment>
              <Edit
                body={body}
                moveUp={moveUp}
                remove={remove}
                setEditing={setEditing}
                setWasMoved={setWasMoved}
                title={title}
                update={update}
                wasMoved={wasMoved}
              />
              <DragHandle />
            </React.Fragment>
          : <Show
              body={body}
              setEditing={setEditing}
              title={title}
              wasEdited={wasEdited}
            />
        }
      </Wrap>
    </AragonCard>
  )
}
