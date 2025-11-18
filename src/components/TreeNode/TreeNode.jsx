import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import styles from './TreeNode.module.css';

export default function TreeNode({ employee }) {
  const { setNodeRef, isOver } = useDroppable({
    id: employee.id,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: employee.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasChildren = employee.children && employee.children.length > 0;

  return (
    <table className={styles.orgTree} cellPadding="0" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td colSpan={hasChildren ? employee.children.length : 1} className={styles.nodeCell}>
            <div
              ref={(node) => {
                setNodeRef(node);
                setSortableRef(node);
              }}
              style={style}
              className={`${styles.nodeCard} ${isOver ? styles.dropTarget : ''} ${
                isDragging ? styles.dragging : ''
              }`}
              data-draggable="true"
              {...attributes}
              {...listeners}
            >
              <EmployeeCard employee={employee} isHighlighted={isOver} />
            </div>
          </td>
        </tr>
        {hasChildren && (
          <>
            <tr>
              <td colSpan={employee.children.length}>
                <div className={styles.downLine}></div>
              </td>
            </tr>
            <tr>
              {employee.children.map((child, idx) => (
                <td key={child.id} className={styles.childCell}>
                  <TreeNode employee={child} />
                </td>
              ))}
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
