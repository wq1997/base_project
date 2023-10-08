import G6 from '@antv/g6';
import { useEffect, useRef } from "react";

const Topology = ({data}) => {
    const ref = useRef();
    const initG6 = () => {
        G6.registerNode('root', {
            draw: (cfg, group) => {
              const size = [90, 40];
              const keyShape = group.addShape('rect', {
                attrs: {
                  width: size[0],
                  height: size[1],
                  x: -size[0] / 2,
                  y: -size[1] / 2,
                  fill: 'rgb(19, 33, 92)',
                  radius: 5
                },
                draggable: true,
                name: 'root-keyshape'
              });
              group.addShape('text', {
                attrs: {
                  text: `${cfg.label}`,
                  fill: 'rgba(255, 255, 255, 0.85)',
                  fontSize: 7,
                  x: -size[0] / 2 + 10,
                  y: -2,
                },
                draggable: true,
                name: 'label-shape1'
              });
              group.addShape('text', {
                attrs: {
                  text: `${cfg.subLabel1}`,
                  fill: 'rgba(255, 255, 255, 0.65)',
                  fontSize: 4,
                  x: -size[0] / 2 + 10,
                  y: 6,
                },
                draggable: true,
                name: 'sublabel-shape2'
              });
              group.addShape('text', {
                attrs: {
                  text: `${cfg.subValue1}`,
                  fill: '#ff6a00',
                  fontSize: 4,
                  x: -size[0] / 2 + 40,
                  y: 6,
                },
                draggable: true,
                name: 'sublabel-shape3'
              });
              group.addShape('text', {
                attrs: {
                  text: `${cfg.subLabel2}`,
                  fill: 'rgba(255, 255, 255, 0.65)',
                  fontSize: 4,
                  x: -size[0] / 2 + 10,
                  y: 12,
                },
                draggable: true,
                name: 'sublabel-shape4'
              });
              group.addShape('text', {
                attrs: {
                  text: `${cfg.subValue2}`,
                  fill: '#ff6a00',
                  fontSize: 4,
                  x: -size[0] / 2 + 40,
                  y: 12,
                },
                draggable: true,
                name: 'sublabel-shape5'
              });
              return keyShape;
            }
          });
          
        G6.registerNode('level1node', {
          draw: (cfg, group) => {
            const size = [110, 40];
            const keyShape = group.addShape('rect', {
              attrs: {
                width: size[0],
                height: size[1],
                x: -size[0] / 2,
                y: -size[1] / 2,
                fill: 'rgb(213, 225, 247)',
                radius: 5
              },
              draggable: true,
              name: 'level1node-keyshape'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.label}`,
                fill: 'rgba(19, 33, 92, 0.85)',
                fontSize: 6,
                x: 0,
                y: -6,
                textAlign: 'center'
              },
              draggable: true,
              name: 'label-shape1'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subLabel1}`,
                fill: 'rgba(19, 33, 92, 0.75)',
                fontSize: 3,
                x: -size[0] / 2 + 10,
                y: 2,
              },
              draggable: true,
              name: 'sublabel-shape2'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subValue1}`,
                fill: '#ff6a00',
                fontSize: 3,
                x: -size[0] / 2 + 40,
                y: 2,
              },
              draggable: true,
              name: 'sublabel-shape3'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subLabel2}`,
                fill: 'rgba(19, 33, 92, 0.75)',
                fontSize: 3,
                x: -size[0] / 2 + 10,
                y: 10,
              },
              draggable: true,
              name: 'sublabel-shape4'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subValue2}`,
                fill: '#ff6a00',
                fontSize: 3,
                x: -size[0] / 2 + 40,
                y: 10,
              },
              draggable: true,
              name: 'sublabel-shape5'
            });
            group.addShape('circle', {
              attrs: {
                r: 2,
                x: 0,
                y: -size[1] / 2,
                fill: '#ededed',
              }
            })
            return keyShape;
          },
          update: undefined,
        }, 'rect')  
        
        G6.registerNode('othernode', {
          draw: (cfg, group) => {
            const size = [70, 40];
            const keyShape = group.addShape('rect', {
              attrs: {
                width: size[0],
                height: size[1],
                x: -size[0] / 2,
                y: -size[1] / 2,
                fill: 'rgb(213, 225, 247)',
                radius: 5
              },
              draggable: true,
              name: 'level2node-keyshape'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.label}`,
                fill: 'rgba(19, 33, 92, 0.65)',
                fontSize: 6,
                x: 10 - size[0] / 2,
                y: -2,
                textAlign: 'left'
              },
              draggable: true,
              name: 'label-shape1'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subLabel1}`,
                fill: 'rgba(19, 33, 92, 0.75)',
                fontSize: 3,
                x: -size[0] / 2 + 10,
                y: 4,
              },
              draggable: true,
              name: 'sublabel-shape2'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subValue1}`,
                fill: '#ff6a00',
                fontSize: 3,
                x: -size[0] / 2 + 40,
                y: 4,
              },
              draggable: true,
              name: 'sublabel-shape3'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subLabel2}`,
                fill: 'rgba(19, 33, 92, 0.75)',
                fontSize: 3,
                x: -size[0] / 2 + 10,
                y: 10,
              },
              draggable: true,
              name: 'sublabel-shape4'
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg.subValue2}`,
                fill: '#ff6a00',
                fontSize: 3,
                x: -size[0] / 2 + 40,
                y: 10,
              },
              draggable: true,
              name: 'sublabel-shape5'
            });
            group.addShape('circle', {
              attrs: {
                r: 2,
                x: 0,
                y: -size[1] / 2,
                fill: '#ededed',
              }
            })
            return keyShape;
          },
          update: undefined
        }, 'rect')
        
        G6.registerEdge('round-poly', {
          draw(cfg, group) {
            const startPoint = cfg.startPoint;
            const endPoint = cfg.endPoint;
            const { style } = cfg;
            const shape = group.addShape("path", {
              attrs: {
                stroke: style.stroke,
                endArrow: style.endArrow,
                path: [
                  ["M", startPoint.x, startPoint.y],
                  ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
                  ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
                  ["L", endPoint.x, endPoint.y],
                ],
              },
            });
            return shape;
          },
      })
      G6.Util.traverseTree(data, subtree => {
          if (subtree.level === undefined) subtree.level = 0;
          subtree.children?.forEach(child => child.level = subtree.level + 1);
          switch (subtree.level) {
            case 0:
              subtree.type = 'root';
              break;
            case 1:
              subtree.type = 'level1node';
              break;
            default:
              subtree.type = 'othernode';
          }
      });
      const width = ref.current.scrollWidth;
      const height = ref.current.scrollHeight;
      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        fitView: true,
        linkCenter: true,
        animate: true,
        layout: {
          type: 'compactBox',
          direction: 'TB',
          getHGap: function getVGap() {
            return 5;
          },
        },
        defaultEdge: {
          type: 'round-poly',
          style: {
            radius: 8,
            stroke: '#ededed',
          }
        },
        defaultNode: {
          anchorPoints: [
            [0.5, 1],
            [0.5, 0]
          ]
        },
        nodeStateStyles: {
          hover: {
            fill: '#fff',
            shadowBlur: 30,
            shadowColor: '#ddd',
          },
          operatorhover: {
            'operator-box': {
              opacity: 1
            }
          }
        },
        modes: {
          default: ['zoom-canvas', 'drag-canvas', 'collapse-expand']
        }
      });
      
      graph.on('node:mouseenter', e => {
        if (e.target.get('name')?.includes('operator')) {
          graph.setItemState(e.item, 'operatorhover', true);
        } else {
          graph.setItemState(e.item, 'hover', true);
        }
      })
      graph.on('node:mouseleave', e => {
        graph.setItemState(e.item, 'operatorhover', false);
        graph.setItemState(e.item, 'hover', false);
      });
      
      graph.data(data);
      graph.render();
    }

    useEffect(()=>{
        initG6();
    }, JSON.stringify(data));

    return (
        <div ref={ref} id="container" style={{width: '100%', height: '100%'}}/>
    )
}

export default Topology;